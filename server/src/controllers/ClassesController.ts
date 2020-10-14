import { Request, Response } from 'express';

import db from '../database/connection';
import convertHourToMinutes from '../utils/convertHourToMinutes';

interface SheduleItem {
  week_day: string;
  from: string;
  to: string;
}

export default class ClassesController {
  async create(request: Request, response: Response) {
    const {
      name,
      avatar,
      whatsapp,
      bio,
      subject,
      cost,
      schedule
    } = request.body;

    const transaction = await db.transaction();

    try {
      const insertedUsersIds = await transaction('users').insert({
        name,
        avatar,
        whatsapp,
        bio
      });

      const user_id = insertedUsersIds[ 0 ];

      const insertedClassesIds = await transaction('classes').insert({
        user_id,
        subject,
        cost
      });

      const class_id = insertedClassesIds[ 0 ];

      const classSchedule = schedule.map((item: SheduleItem) => {
        return {
          class_id,
          week_day: item.week_day,
          from: convertHourToMinutes(item.from),
          to: convertHourToMinutes(item.to)
        };
      });

      await transaction('class_schedule').insert(classSchedule);

      await transaction.commit();

      return response.status(201).send();
    }
    catch(error) {
      await transaction.rollback();
      return response.status(400).json({
        'message': 'Unexpected error',
        'error': error
      });
    }
  }

  async index(request: Request, response: Response) {
    const filters = request.query;

    if(!filters.subject || !filters.week_day || !filters.time) {
      return response.status(400).json({
        error: 'Missing filters to search classes'
      });
    }

    const subject = filters.subject as string;
    const week_day = filters.week_day as string;
    const time = filters.time as string;

    const timeInMinutes = convertHourToMinutes(time);

    try {
      const classes = await db('classes')
        .whereExists(function () {
          this.select('class_schedule.*')
            .from('class_schedule')
            .whereRaw('`class_schedule`.`class_id` = `classes`.`id`')
            .whereRaw('`class_schedule`.`week_day` = ??', [ Number(week_day) ])
            .whereRaw('`class_schedule`.`from` <= ??', [ timeInMinutes ])
            .whereRaw('`class_schedule`.`to` > ??', [ timeInMinutes ]);
        })
        .where('classes.subject', '=', subject)
        .join('users', 'classes.user_id', '=', 'users.id')
        .select([ 'classes.*', 'users.*' ]);

      if(classes.length <= 0) {
        return response.status(204).json(classes);
      }

      return response.status(200).json(classes);
    }

    catch(error) {
      return response.json(error);
    }
  }
}