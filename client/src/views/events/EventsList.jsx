import React, { Component } from 'react';
import Events from './../../event-mock-data.json';
import EventCard from './../../components/EventCard';

class EventList extends Component {
  render() {
    return (
      <div>
        <h1>Events List</h1>
        <section className="event__list">
          {Events.map(event => (
            <EventCard key={event.name} event={event} />
          ))}
        </section>
      </div>
    );
  }
}

export default EventList;
