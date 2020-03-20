import React, { Component } from 'react';
import { findAllEvents } from './../../services/event';
import EventCard from './../../components/EventCard';
import './Events.scss';

class EventList extends Component {
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
    return (
      <div>
        <h1>Events List</h1>
        <section className="event__list">
          {this.state.events.map(event => (
            <EventCard key={event.name} event={event} />
          ))}
        </section>
      </div>
    );
  }
}

export default EventList;
