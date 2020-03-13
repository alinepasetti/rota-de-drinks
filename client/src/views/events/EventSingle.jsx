import React, { Component } from 'react';
import Events from './../../event-mock-data.json';

class EventSingle extends Component {
  render() {
    return (
      <div className="event__single__page">
        <header>
          <h1>{Events[0].name}</h1>
          <img src={Events[0].imgURL} />
        </header>
        <div className="tags__section">
          {Events[0].tags.map(tag => (
            <span>{tag}</span>
          ))}
        </div>
        <p>{Events[0].description}</p>
        <p>Location: {Events[0].location}</p>
        <section className="atendees__section">
          {Events[0].attendees.map(attendee => {
            return (
              <div>
                <img src={attendee.picture} />
                <p>{attendee.name}</p>
              </div>
            );
          })}
          </section>
       
            <button>{(Events[0].price / 100).toFixed(2)}$ | Buy</button>
         
      </div>
    );
  }
}

export default EventSingle;
