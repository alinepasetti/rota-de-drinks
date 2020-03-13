import React, { Component } from 'react';
import Events from './../../event-mock-data.json';
import { Link } from 'react-router-dom';

class ExperienceIntro extends Component {
  render() {
    return (
      <div className="experience__intro__page">
        <header>
          <h1>{Events[0].name}</h1>
          <img src={Events[0].imgURL} alt={Events[0].name} />
        </header>
        <p>WELCOME TO THIS EXPERIENCE! text with instructions</p>
        <Link to={`/event/${Events[0]._id}/experience/${Events[0].stops[0]._id}`}>Start</Link>
      </div>
    );
  }
}

export default ExperienceIntro;
