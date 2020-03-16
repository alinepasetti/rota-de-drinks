import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { findOneEvent, findOneEventAndAddAttendee } from './../../services/event';
import { findOneUserAndAddEvent } from './../../services/user';

class EventSingle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      event: null,
      userSavedEvent: false
    };
    this.saveEvent = this.saveEvent.bind(this);
  }
  async componentDidMount() {
    await this.fetchData();
    const eventId = this.props.match.params.eventId;
    const user = this.props.user;
    let userSavedEvent = false;
    const userEvents = user ? user.events : [];
    userEvents.map(event => {
      if (event.eventId.toString() === eventId.toString()) {
        console.log('there was a match');
        userSavedEvent = true;
      }
    });
    this.setState({ userSavedEvent });
  }

  async fetchData() {
    const eventId = this.props.match.params.eventId;
    const event = await findOneEvent(eventId);
    this.setState({ event });
  }
  async saveEvent() {
    // event id into the event function
    const eventId = this.props.match.params.eventId;
    // user id into the user function
    const userId = this.props.user._id;
    const event = await findOneEventAndAddAttendee(eventId, userId);
    await findOneUserAndAddEvent(userId, eventId);
    this.setState({ event, userSavedEvent: true });
  }

  render() {
    const user = this.props.user;
    const event = this.state.event;
    const userHasEvent = this.state.userSavedEvent;

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
              {(event.attendee &&
                event.attendees.map(attendee => {
                  return (
                    <div key={attendee.name}>
                      <img src={attendee.picture} alt={attendee.name} />
                      <p>{attendee.name}</p>
                    </div>
                  );
                })) ||
                ' '}
            </section>
            {(!user && (
              <Link to="/sign-up" className="button">
                {(event.price / 100).toFixed(2)}$ | Buy
              </Link>
            )) ||
              (userHasEvent && <div>Heeey</div>) || (
                <a onClick={this.saveEvent} className="button">
                  {(event.price / 100).toFixed(2)}$ | Buy
                </a>
              )}
          </Fragment>
        )) ||
          ''}
      </div>
    );
  }
}

export default EventSingle;
