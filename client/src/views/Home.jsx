import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import EventCard from './../components/EventCard';
import { findAllEvents } from './../services/event';
import MainBannerSlider from './../components/MainBannerSlider';

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
      <div className="home__page">
        {(events && (
          <Fragment>
            <MainBannerSlider />
            <h2>Popular Events</h2>
            <section className="event__list">
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
