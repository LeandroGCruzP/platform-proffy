import React from 'react';
import './styles.css';
import whatsappIcon from '../../assets/icons/whatsapp.svg';
import api from '../../services/api';

export interface Teacher {
  id: number;
  subject: string;
  cost: number;
  user_id: number;
  name: string;
  avatar: string;
  whatsapp: string;
  bio: string;
}

interface TeacherItemProps {
  teacher: Teacher;
}

export default function TeacherItem(props: TeacherItemProps): JSX.Element {
  const { teacher } = props;
  const { whatsapp } = teacher;

  const formatedNumber = whatsapp.trim();
  const urlAPIWhatsapp = `https://api.whatsapp.com/send?phone=55${ formatedNumber }`;

  function createNewConnection() {
    api.post('connections', {
      user_id: teacher.id
    });
  }

  return (
    <section className="teacher-item-card">
      <article className="teacher-item">
        <header>
          <img
            src={ teacher.avatar }
            alt={ teacher.name }
          />
          <div>
            <strong>{ teacher.name }</strong>
            <span>{ teacher.subject }</span>
          </div>
        </header>

        <p>
          {
            teacher.bio
          }
        </p>

        <footer>
          <p>
            Preço/hora:
              <strong>{ `R$: ${ teacher.cost }` } </strong>
          </p>

          <a
            onClick={ createNewConnection }
            href={ urlAPIWhatsapp }
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={ whatsappIcon } alt="Whatsapp" />
              Entrar em contato
          </a>
        </footer>

      </article>
    </section>
  );
}