import React, { Component, Fragment } from 'react';
import { findOneEvent } from './../../services/event';

class EventSingle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      event: null
    };
  }
  componentDidMount() {
    this.fetchData();
  }

  async fetchData() {
    const eventId = this.props.match.params.eventId;
    const event = await findOneEvent(eventId);
    this.setState({ event });
  }
  render() {
    const event = this.state.event;
    return (
      <div className="event__single__page">
        {(event && (
          <Fragment>
            <header>
              <h1>{event.name}</h1>
              <img src={event.imgURL} alt={event.name} />
            </header>
            <div className="tags__section">
              {event.tags.map(tag => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
            <p>{event.description}</p>
            <p>Location: {event.location}</p>
            <section className="atendees__section">
              {event.attendees.map(attendee => {
                return (
                  <div key={attendee.name}>
                    <img src={attendee.picture} alt={attendee.name} />
                    <p>{attendee.name}</p>
                  </div>
                );
              })}
            </section>

            <button>{(event.price / 100).toFixed(2)}$ | Buy</button>
          </Fragment>
        )) ||
          ''}{' '}
      </div>
    );
  }
}

export default EventSingle;
