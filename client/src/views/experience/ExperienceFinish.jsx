import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { findOneEvent } from './../../services/event';
import { findOneUserAndCompleteEventToTrue } from './../../services/user';
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
  async finishExperience() {
    const userId = this.props.user._id;
    const eventId = this.props.match.params.eventId;
    const badgeId = this.state.event ? this.state.event.badge._id : '';
    await findOneUserAndCompleteEventToTrue(userId, eventId, badgeId);
  }

  render() {
    const event = this.state.event;
    const userId = this.props.user._id;

    return (
      <div className="experience__finish__page">
        {event && (
          <Fragment>
            <h1>Congratulations! </h1>
            <h3>You have finished this experience!!</h3>
            <img src={event.badge.imgURL} alt={event.badge.name} />
            <p>{event.badge.name}</p>
            <Link to={`/profile/${userId}`} className="button" onClick={this.finishExperience}>
              Add to my profile
            </Link>
          </Fragment>
        )}
      </div>
    );
  }
}

export default ExperienceFinish;
