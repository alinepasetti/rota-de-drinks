import React, { Component, Fragment } from 'react';
import { findOneEvent } from './../../services/event';
import './../../App.scss';

class ExperienceFinish extends Component {
  constructor(props) {
    super(props);
    this.state = {
      event: null
    };
    this.finishExperience = this.finishExperience.bind(this);
  }
  componentDidMount() {
    this.fetchData();
  }

  async fetchData() {
    const eventId = this.props.match.params.eventId;
    const event = await findOneEvent(eventId);
    this.setState({ event });
  }
  finishExperience() {
    console.log('click');
  }

  render() {
    const event = this.state.event;
    return (
      <div>
        {event && (
          <Fragment>
            <h1>Congratulations! </h1>
            <h3>You have finished this experience!!</h3>
            <img src={event.badge.imgURL} />
            <h3>{event.badge.name}</h3>
            <a className="button" onClick={this.finishExperience}>
              Add to my profile
            </a>
          </Fragment>
        )}
      </div>
    );
  }
}

export default ExperienceFinish;
