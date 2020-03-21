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
              <h1>Hey Friday</h1>
              <p>Gather friends and badges</p>
            </header>
            <section className="event__list">
              <h2>Popular Events</h2>
              {this.state.events.map(event => (
                <EventCard key={event.name} event={event} />
              ))}
            </section>
            <Link className="see__more__button" to="/events">
              See all events
            </Link>
          </Fragment>
        )) ||
          ''}
      </div>
    );
  }
}

export default Home;
