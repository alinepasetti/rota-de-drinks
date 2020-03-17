import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { findOneEvent } from './../../services/event';

class ExperienceIntro extends Component {
  constructor(props) {
    super(props);
    this.state = {
      event: null
    };
  }

  async componentDidMount() {
    await this.fetchData();
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
        {event && (
          <Fragment>
            <header>
              <h1 className="experience__title">{event.name}</h1>
              <img src={event.imgURL} alt={event.name} />
            </header>
            <p>
              <strong>WELCOME!</strong>
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua.
            </p>
            <Link to={`/event/${event._id}/experience/${event.stops[0]._id}`} className="button">
              Start
            </Link>
          </Fragment>
        )}
      </div>
    );
  }
}

export default ExperienceIntro;
