import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { loadUserInformation } from './../../services/user';
import './Profile.scss';

class ProfileView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profileOwner: null
    };
  }

  async componentDidMount() {
    const userId = this.props.match.params.userId;

    try {
      const profileOwner = await loadUserInformation(userId);
      this.setState({
        profileOwner
      });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const profileOwner = this.state.profileOwner;
    const loggedUser = this.props.user;
    // console.log('profileOwner', profileOwner);
    // console.log('loggedUser', loggedUser);

    return (
      <div className="profile">
        <div className="public__section">
          {profileOwner && (
            <Fragment>
              <figure className="profile__picture">
                <img src={profileOwner.picture} alt={profileOwner.firstName} />
              </figure>
              <h2>
                {profileOwner.firstName} {profileOwner.lastName}
              </h2>
              <span>{profileOwner.email}</span>
            </Fragment>
          )}
          {profileOwner && profileOwner.city && <span>{profileOwner.city}</span>}
          {profileOwner && profileOwner.about && <span>{profileOwner.about}</span>}
          {profileOwner && profileOwner.badges.length > 0 && (
            <Fragment>
              <h3>Badges</h3>
              {profileOwner.badges.map(badge => {
                return (
                  <div key={badge.name}>
                    <img src={badge.imgURL} alt={badge.name} />
                    <p>{badge.name}</p>
                  </div>
                );
              })}
            </Fragment>
          )}
        </div>
        <div className="private__section">
          {profileOwner && loggedUser && profileOwner._id === loggedUser._id && (
            <Fragment>
              <h3>Next Events</h3>
              {loggedUser.events.map(event => {
                if (!event.completed) {
                  return (
                    <Link
                      to={`/event/${event.eventId._id}`}
                      className="event__card"
                      key={event.eventId._id}
                    >
                      <img src={event.eventId.imgURL} alt={event.eventId.name} />
                      <p>{event.eventId.name}</p>
                    </Link>
                  );
                }
              })}
              <h3>Past Events</h3>
              {loggedUser.events.map(event => {
                if (event.completed) {
                  return (
                    <Link
                      to={`/event/${event.eventId._id}`}
                      className="event__card"
                      key={event.eventId._id}
                    >
                      <img src={event.eventId.imgURL} alt={event.eventId.name} />
                      <p>{event.eventId.name}</p>
                    </Link>
                  );
                }
              })}
              <Link to={`/profile/${loggedUser._id}/edit`}>Edit Profile</Link>
            </Fragment>
          )}
        </div>
      </div>
    );
  }
}

export default ProfileView;
