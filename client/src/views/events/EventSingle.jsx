import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { findOneEvent, findOneEventAndAddAttendee } from './../../services/event';
import { findOneUserAndAddEvent } from './../../services/user';
import { createPurchase } from './../../services/purchase';
import SimpleMap from './../../components/SimpleMap';
import PaymentModal from './../../components/PaymentModal';
import './Events.scss';

class EventSingle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      event: null,
      userBoughtEvent: false,
      paymentModalOpen: false
    };
    this.buyEvent = this.buyEvent.bind(this);
    this.handlepaymentModal = this.handlepaymentModal.bind(this);
  }
  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(previousProps, previousState) {
    if (previousState.userBoughtEvent !== this.state.userBoughtEvent) {
      this.fetchData();
    }
  }

  async fetchData() {
    const currentEventId = this.props.match.params.eventId;
    const event = await findOneEvent(currentEventId);
    const user = this.props.user;
    let userBoughtEvent;
    const userEvents = user ? user.events : [];
    if (userEvents.length > 0) {
      userEvents.map(event => {
        if (event.eventId && event.eventId._id.toString() === currentEventId.toString()) {
          userBoughtEvent = true;
        }
        return userBoughtEvent;
      });
    }
    this.setState({ event, userBoughtEvent });
  }

  async buyEvent() {
    const eventId = this.props.match.params.eventId;
    const userId = this.props.user._id;
    try {
      const purchaseResult = await createPurchase(eventId);
      const status = purchaseResult.data.paymentStatus;
      if (status === 'succeeded') {
        const event = await findOneEventAndAddAttendee(eventId, userId);
        const userData = await findOneUserAndAddEvent(userId, eventId);
        const user = userData.data.user;
        this.props.updateUserInformation(user);
        this.setState({ event, userBoughtEvent: true });
      }
    } catch (error) {
      console.log(error);
    }
  }

  handlepaymentModal() {
    this.setState(previousState => ({ paymentModalOpen: !previousState.paymentModalOpen }));
  }

  render() {
    const user = this.props.user;
    const event = this.state.event;
    const userBoughtEvent = this.state.userBoughtEvent;
    return (
      <div className="event__single__page">
        {(event && (
          <Fragment>
            <header>
              <img src={event.imgURL} alt={event.name} />
              <h1 className="experience__title">{event.name}</h1>
            </header>
            <div className="tags__section">
              {event.tags.map(tag => (
                <span key={tag}>#{tag}</span>
              ))}
            </div>
            <h3>Who's joining</h3>
            <section className="atendees__section">
              {event.attendees &&
                event.attendees.map((attendee, index) => {
                  if (index <= 6) {
                    return (
                      <img key={attendee._id} src={attendee.picture} alt={attendee.firstName} />
                    );
                  }
                })}
              {event.attendees && event.attendees.length > 6 && (
                <div className="img__attendees">+ {event.attendees.length - 5}</div>
              )}
            </section>
            <h3>General Info</h3>
            <p>{event.description}</p>
            <p className="event__location">
              <img src="/location.svg" /> {event.location}
            </p>

            <h3>What's planned</h3>
            <section className="map__section">
              <ul>
                {event.stops.map((stop, index) => (
                  <li key={stop.name}>
                    <span className="location__list">{index + 1}</span>
                    {stop.name} - {stop.address}
                  </li>
                ))}
              </ul>
              <SimpleMap stops={event.stops} />
            </section>
            <PaymentModal
              paymentModalOpen={this.state.paymentModalOpen}
              handlepaymentModal={this.handlepaymentModal}
              buyEvent={this.buyEvent}
              user={user}
            />

            {(!user && (
              <Link to="/sign-up" className="button">
                Buy ticket <span>{(event.price / 100).toFixed(2)}€</span>
              </Link>
            )) ||
              (userBoughtEvent && (
                <Link to={`/event/${this.state.event._id}/experience/intro`} className="button">
                  Start Experience
                </Link>
              )) ||
              (!userBoughtEvent && (
                <Link onClick={this.handlepaymentModal} className="button">
                  Buy ticket <span>{(event.price / 100).toFixed(2)}€</span>
                </Link>
              ))}
          </Fragment>
        )) ||
          ''}
      </div>
    );
  }
}

export default EventSingle;
