import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { findOneEvent } from './../../services/event';

class ExperienceStop extends Component {
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
    console.log(event);
    this.setState({ event });
  }

  render() {
    const event = this.state.event;
    return (
      <div className="experience__stop__page">
        {event && (
          <Fragment>
            <header>
              <h1>{event.name}</h1>
              <img src={event.imgURL} alt={event.name} />
            </header>
            <div className="experience__stop__information">
              <p>
                <strong>{event.stops[0].name}</strong>
              </p>
              <p>{event.stops[0].address}</p>
            </div>
            <div className="experience__stop__activity">
              <p>
                <strong>{event.stops[0].activity.name}</strong>
              </p>
              <p>{event.stops[0].activity.instructions}</p>
              <img src={event.stops[0].activity.imgURL} alt={event.stops[0].activity.name} />
            </div>
            <div className="experience__stop__map">
              <h3>Map</h3>
              {/* incluir google maps */}
            </div>
            <Link to={`/event/${event._id}/experience/${event.stops[1]._id}`}>Next</Link>
          </Fragment>
        )}
      </div>
    );
  }
}

export default ExperienceStop;
