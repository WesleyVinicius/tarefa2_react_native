import React, { FormEvent, useState } from 'react';

import PageHeader from '../../components/PageHeader';
import CoachItem, { Coach } from '../../components/CoachItem';
import Input from '../../components/Input';
import Select from '../../components/Select';

import api from '../../services/api';

import './styles.css';

function CoachList() {
  const [coaches, setCoaches] = useState([]);

  const [subject, setSubject] = useState('');
  const [week_day, setWeekDay] = useState('');
  const [time, setTime] = useState('');

  async function searchCoaches(e: FormEvent) {
    e.preventDefault();

    const response = await api.get('classes', {
      params: {
        subject,
        week_day,
        time,
      }
    });

    setCoaches(response.data);
  }

  return (
    <div id="page-coach-list" className="container">
      <PageHeader title="Estes são os coachs disponíveis.">
        <form id="search-coaches" onSubmit={searchCoaches}>
          <Select 
            name="subject" 
            label="Matéria" 
            value={subject}
            onChange={e => { setSubject(e.target.value) }}
            options={[
              { value: 'Artes', label: 'Artes' },
              { value: 'Biologia', label: 'Biologia' },
              { value: 'Ciências', label: 'Ciências' },
              { value: 'Educação física', label: 'Educação física' },
              { value: 'Física', label: 'Física' },
              { value: 'Geografia', label: 'Geografia' },
              { value: 'História', label: 'História' },
              { value: 'Matemática', label: 'Matemática' },
              { value: 'Português', label: 'Português' },
              { value: 'Química', label: 'Química' },
            ]}
          />

          <Select 
            name="week_day" 
            label="Dia da semana" 
            value={week_day}
            onChange={e => { setWeekDay(e.target.value) }}
            options={[
              { value: '0', label: 'Domingo' },
              { value: '1', label: 'Segunda-feira' },
              { value: '2', label: 'Terça-feira' },
              { value: '3', label: 'Quarta-feira' },
              { value: '4', label: 'Quinta-feira' },
              { value: '5', label: 'Sexta-feira' },
              { value: '6', label: 'Sábado' },
            ]}
          />
          
          <Input 
            type="time" 
            name="time" 
            label="Hora" 
            value={time}
            onChange={e => { setTime(e.target.value) }}
          />

          <button type="submit">
            Buscar
          </button>
        </form>
      </PageHeader>

      <main>
        {coaches.map((coach: Coach) => {
          return <CoachItem key={coach.id} coach={coach} />;
        })}
      </main>
    </div>
  );
}

export default CoachList;