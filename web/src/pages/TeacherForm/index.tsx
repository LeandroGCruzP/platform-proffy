import React, { useState, FormEvent } from 'react';
import PageHeader from '../../components/PageHeader';
import Input from '../../components/Input';
import warningIcon from '../../assets/icons/warning.svg';
import Textarea from '../../components/Textarea';
import Select from '../../components/Select';
import './styles.css';
import api from '../../services/api';
import { useHistory } from 'react-router-dom';

export default function TeacherForm(): JSX.Element {
  const [ scheduleItems, setScheduleItems ] = useState([
    { week_day: 0, from: '', to: '' },
  ]);

  const [ name, setname ] = useState('');
  const [ whatsapp, setwhatsapp ] = useState('');
  const [ avatar, setavatar ] = useState('');
  const [ bio, setbio ] = useState('');
  const [ subject, setsubject ] = useState('');
  const [ cost, setcost ] = useState('');

  const history = useHistory();

  function addNewScheduleItem() {
    setScheduleItems([
      ...scheduleItems,
      {
        week_day: 0,
        from: '',
        to: ''
      }
    ]);
  }

  function handleCreateClass(event: FormEvent) {
    event.preventDefault();

    api.post('/classes', {
      name,
      whatsapp,
      avatar,
      bio,
      subject,
      cost: Number(cost),
      schedule: scheduleItems
    }).then(
      () => {
        alert("Cadastro realizado com sucesso");
        history.push('/');
      }
    ).catch(() => {
      alert("Falha ao cadastrar");
    });

  }

  function setScheduleItemValue(position: number, field: string, value: string) {
    const updatedScheduleItems = scheduleItems.map((item, index) => {
      if(index === position) {
        return {
          ...item, [ field ]: value
        };
      }

      return item;
    });

    setScheduleItems(updatedScheduleItems);
  }

  return (
    <main id="page-teacher-form" className="container">
      <PageHeader
        title="Que incrível que você quer dar aulas!"
        description="O primeiro passo é preencher este formulário de inscrição!"
      />

      <section>
        <form onSubmit={ handleCreateClass }>

          <fieldset>
            <legend>Seus dados</legend>
            <Input
              name="name"
              label="Nome completo"
              value={ name }
              onChange={ (e) => { setname(e.target.value); } }
            />
            <Input
              name="avatar"
              label="Avatar"
              value={ avatar }
              onChange={ (e) => { setavatar(e.target.value); } }
            />
            <Input
              name="whatsapp"
              label="Whatsapp"
              value={ whatsapp }
              onChange={ (e) => { setwhatsapp(e.target.value); } }
            />
            <Textarea
              name="bio"
              label="Biografia"
              value={ bio }
              onChange={ (e) => { setbio(e.target.value); } }
            />
          </fieldset>

          <fieldset>
            <legend>Sobre a aula</legend>

            <Select
              name="suject"
              label="Matéria"
              value={ subject }
              onChange={ (e) => { setsubject(e.target.value); } }
              options={ [
                { value: 'Artes', label: 'Artes' },
                { value: 'Biologia', label: 'Biologia' },
                { value: 'Ed.Física', label: 'Ed.Física' },
                { value: 'Espanhol', label: 'Espanhol' },
                { value: 'Filosofia', label: 'Filosofia' },
                { value: 'Física', label: 'Física' },
                { value: 'Geografia', label: 'Geografia' },
                { value: 'História', label: 'História' },
                { value: 'Inglês', label: 'Inglês' },
                { value: 'Matemática', label: 'Matemática' },
                { value: 'Português', label: 'Português' },
                { value: 'Química', label: 'Química' },
                { value: 'Sociologia', label: 'Sociologia' },
              ] }
            />

            <Input
              name="cost"
              label="Custa da sua hora por aula"
              value={ cost }
              onChange={ (e) => { setcost(e.target.value); } }
            />
          </fieldset>

          <fieldset>
            <legend>
              Horários disponíveis
            <button type="button" onClick={ addNewScheduleItem }>
                + Novo horário
            </button>
            </legend>

            {
              scheduleItems.map((item, index) => {
                return (
                  <div className="schedule-item" key={ index }>
                    <Select
                      name="week_day"
                      label="Dia da semana"
                      value={ item.week_day }
                      onChange={
                        e => setScheduleItemValue(index, 'week_day', e.target.value)
                      }
                      options={ [
                        { value: '0', label: 'Domingo' },
                        { value: '1', label: 'Segunda-feira' },
                        { value: '2', label: 'Terça-feira' },
                        { value: '3', label: 'Quarta-feira' },
                        { value: '4', label: 'Quinta-feira' },
                        { value: '5', label: 'Sexta-feira' },
                        { value: '6', label: 'Sábado' },
                      ] }
                    />

                    <Input
                      name="from"
                      label="Das"
                      type="time"
                      value={ item.from }
                      onChange={
                        e => setScheduleItemValue(index, 'from', e.target.value)
                      }
                    />

                    <Input
                      name="to"
                      label="Até"
                      type="time"
                      value={ item.to }
                      onChange={
                        e => setScheduleItemValue(index, 'to', e.target.value)
                      }
                    />
                  </div>
                );
              })
            }

          </fieldset>

          <footer>
            <p>
              <img src={ warningIcon } alt="Aviso importante" />
            Importante! <br />
            Preencha todos os dados
          </p>
            <button type="submit">Salvar cadastro</button>
          </footer>

        </form>
      </section>
    </main>
  );
}