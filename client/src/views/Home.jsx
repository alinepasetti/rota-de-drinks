import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import EventCard from './../components/EventCard';
import { findAllEvents } from './../services/event';

class Home extends Component {
  constructor() {
    super();
    this.state = {
      events: []
    };
  }
  componentDidMount() {
    this.fetchData();
  }
  async fetchData() {
    const events = await findAllEvents();
    this.setState({ events });
  }
  render() {
    const events = this.state.events;
    return (
      <div>
        {(events && (
          <Fragment>
            <header className="home__header">
              <h1>Rota dos Drinks</h1>
              <p>About this beautiful site</p>
            </header>
            <section className="event__list">
              <h2>Popular Events</h2>
              {this.state.events.map(event => (
                <EventCard key={event.name} event={event} />
              ))}
              <Link to="/events">See all events</Link>
            </section>
          </Fragment>
        )) ||
          ''}
      </div>
    );
  }
}

export default Home;
