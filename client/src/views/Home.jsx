import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import EventCard from './../components/EventCard';
import Events from './../event-mock-data.json';

class Home extends Component {
  render() {
    return (
      <div>
        <header className="home__header">
          <h1>Rota dos Drinks</h1>
          <p>About this beautiful site</p>
        </header>
        <section className="event__list">
          <h2>Popular Events</h2>
          {Events.map(event => (
            <EventCard key={event.name} event={event} />
          ))}
          <Link to="/events">See all events</Link>
        </section>
      </div>
    );
  }
}

export default Home;
