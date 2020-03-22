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

  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(previousProps, previousState) {
    if (
      previousState.profileOwner &&
      previousState.profileOwner.badges !== this.state.profileOwner.badges
    ) {
      this.fetchData();
    }
  }

  async fetchData() {
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
          <div>
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
            {profileOwner && profileOwner.city && <p>{profileOwner.city}</p>}
            {profileOwner && profileOwner.about && <p>{profileOwner.about}</p>}
          </div>

          {profileOwner && profileOwner.badges.length > 0 && (
            <Fragment>
              <h3>Badges</h3>
              <section className="badges__list">
                {profileOwner.badges.map(badge => {
                  return (
                    <div className="badge__item" key={badge.name}>
                      <img src={badge.imgURL} alt={badge.name} />
                      <p>{badge.name}</p>
                    </div>
                  );
                })}
              </section>
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
                    <Fragment key={event.eventId._id}>
                      <section className="event__list">
                        <Link
                          to={`/event/${event.eventId._id}`}
                          className="event__card"
                          key={event.eventId._id}
                        >
                          <img src={event.eventId.imgURL} alt={event.eventId.name} />
                          <p>{event.eventId.name}</p>
                        </Link>
                      </section>
                    </Fragment>
                  );
                }
              })}
              <Fragment>
                <h3>Past Events</h3>
                {loggedUser.events.map(event => {
                  if (event.completed) {
                    return (
                      <section className="event__list" key={event.eventId._id}>
                        <Link
                          to={`/event/${event.eventId._id}`}
                          className="event__card"
                          key={event.eventId._id}
                        >
                          <img src={event.eventId.imgURL} alt={event.eventId.name} />
                          <p>{event.eventId.name}</p>
                        </Link>
                      </section>
                    );
                  }
                })}
              </Fragment>

              <div className="private__links">
                <Link to={`/profile/${loggedUser._id}/edit`}>Edit Profile</Link>
                <Link to={`/${loggedUser._id}/payment-method/list`}>View Payment Methods</Link>
              </div>
            </Fragment>
          )}
        </div>
      </div>
    );
  }
}

export default ProfileView;
