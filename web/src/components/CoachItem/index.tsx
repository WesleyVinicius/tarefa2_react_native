import React from 'react';

import api from '../../services/api';

import whatsappIcon from '../../assets/images/icons/whatsapp.svg';

import './styles.css';

export interface ScheduleItem {
  week_day: number;
  from: string;
  to: string;
}

export interface Coach {
  id: number;
  avatar: string;
  bio: string;
  cost: number;
  name: string;
  subject: string;
  whatsapp: string;
  schedule: ScheduleItem[];
}

const weekDays = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];

interface CoachItemProps {
  coach: Coach;
}

const CoachItem: React.FC<CoachItemProps> = ({ coach }) => {
  function createNewConnection() {
    api.post('connections', {
      coach_id: coach.id,
    });
  }

  return (
    <article className="coach-item">
      <header>
        <img src={coach.avatar} alt={coach.name} />
        <div>
          <strong>{coach.name}</strong>
          <span>{coach.subject}</span>
        </div>
      </header>

      <p>{coach.bio}</p>

      <ul className="schedule-list">
        {coach.schedule?.map((item, index) => (
          <li key={index}>
            <span>{weekDays[item.week_day]}</span>
            <strong>{item.from} - {item.to}</strong>
          </li>
        ))}
      </ul>
    </article>
  );
}

export default CoachItem;