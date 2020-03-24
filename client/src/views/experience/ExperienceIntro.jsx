import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { findOneEvent } from './../../services/event';
import './experience.scss';

class ExperienceIntro extends Component {
  constructor(props) {
    super(props);
    this.state = {
      event: null,
      userHasEvent: false
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  async fetchData() {
    const eventId = this.props.match.params.eventId;
    const event = await findOneEvent(eventId);
    this.setState({ event });

    const user = this.props.user;
    if (user) {
      user.events.map(item => {
        if (item.eventId && item.eventId._id === eventId) {
          this.setState({ userHasEvent: true });
        }
      });
    }
  }

  render() {
    const event = this.state.event;
    const userHasEvent = this.state.userHasEvent;

    return (
      <div className="experience__intro__page">
        {event && (
          <Fragment>
            <header>
              <h1 className="experience__title">{event.name}</h1>
              <img src={event.imgURL} alt={event.name} />
            </header>
            <h3>
              <strong>WELCOME!</strong>
            </h3>
            <p>
              Hello friend! Follow the steps to experience your event. Like any good adventure,
              there’s a sweet reward waiting for you at the end.
            </p>
          </Fragment>
        )}
        {(event && userHasEvent && (
          <Link to={`/event/${event._id}/experience/${event.stops[0]._id}`} className="button">
            Continue
          </Link>
        )) ||
          (event && !userHasEvent && (
            <Link to={`/event/${event._id}`} className="button">
              Buy event
            </Link>
          ))}
      </div>
    );
  }
}

export default ExperienceIntro;
