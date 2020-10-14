import React, { useState, useEffect } from 'react';

import logoImg from '../../assets/logo.svg';
import landingImg from '../../assets/landing.svg';
import studyIcon from '../../assets/icons/study.svg';
import giveClassesIcon from '../../assets/icons/give-classes.svg';
import purpleHeart from '../../assets/icons/purple-heart.svg';

import './styles.css';
import { Link } from 'react-router-dom';
import api from '../../services/api';

export default function Landing(): JSX.Element {
  const [ totalConnections, setTotalConnections ] = useState(0);

  useEffect(() => {

    api.get('/connections').then(response => {
      const total = response.data.total;
      setTotalConnections(total);
    });

  }, []);

  return (
    <main id="page-landing">
      <section id="page-landing-content" className="container">
        <div className="logo-container">
          <img src={ logoImg } alt="Proffy" />
          <h2>Sua plataforma de estudos online.</h2>
        </div>

        <img
          src={ landingImg }
          alt="Plataforma de estudos"
          className="hero-image"
        />

        <div className="buttons-container">
          <Link to="/study" className="study">
            <img src={ studyIcon } alt="Estudar" />
            Estudar
          </Link>

          <Link to="/give-classes" className="give-classes">
            <img src={ giveClassesIcon } alt="Dar aulas" />
            Dar aulas
          </Link>
        </div>

        <span className="total-connections">
          {
            `Total de ${ totalConnections } conexões já realizadas`
          }
          <img src={ purpleHeart } alt="Coração roxo" />
        </span>
      </section>
    </main>
  );
}