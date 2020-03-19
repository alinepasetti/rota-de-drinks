import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { findOneEvent, findOneEventAndAddAttendee } from './../../services/event';
import { findOneUserAndAddEvent } from './../../services/user';
import { createPurchase } from './../../services/purchase';
import SimpleMap from './../../components/SimpleMap';
import PaymentModal from './../../components/PaymentModal';

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
    const currentEventId = this.props.match.params.eventId;
    const user = this.props.user;
    let userBoughtEvent;
    const userEvents = user ? user.events : [];
    if (userEvents.length > 0) {
      userEvents.map(event => {
        console.log('each event', event.eventId._id.toString());
        if (event.eventId && event.eventId._id.toString() === currentEventId.toString()) {
          userBoughtEvent = true;
        }
        return userBoughtEvent;
      });
    }
    this.setState({ userBoughtEvent });
  }

  async fetchData() {
    const eventId = this.props.match.params.eventId;
    const event = await findOneEvent(eventId);
    this.setState({ event });
  }
  async buyEvent() {
    // event id into the event function
    const eventId = this.props.match.params.eventId;
    // user id into the user function
    const userId = this.props.user._id;
    try {
      const event = await findOneEventAndAddAttendee(eventId, userId);
      await findOneUserAndAddEvent(userId, eventId);
      this.setState({ event, userBoughtEvent: true, paymentModalOpen: false });
      await createPurchase(eventId);
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
              <h1 className="experience__title">{event.name}</h1>
              <img src={event.imgURL} alt={event.name} />
            </header>
            <div className="tags__section">
              {event.tags.map(tag => (
                <span key={tag}>#{tag}</span>
              ))}
            </div>
            <h4>General Info</h4>
            <p>{event.description}</p>
            <p>
              <strong>Location:</strong> {event.location}
            </p>
            <h4>Who's joining</h4>
            <section className="atendees__section">
              {event.attendees &&
                event.attendees.map(attendee => {
                  return (
                    <div key={attendee._id}>
                      <img src={attendee.picture} alt={attendee.firstName} />
                      <p>{attendee.firstName}</p>
                    </div>
                  );
                })}
            </section>
            <h4>What's planned</h4>
            <section className="map__section">
              <ul>
                {event.stops.map(stop => (
                  <li key={stop.name}>
                    <img
                      className="map__pin"
                      alt="pin"
                      src="https://lh3.googleusercontent.com/proxy/N5nK6_aFs21-seXcvFDUDfbId51CuNvzfWbjSbQiEwNvFb9ZHkggOuf9OhS4szAFsGWD6iZXGecTcBeLeiHuVBOhHh-yLnjdgQqeTB98ODhQxAX640s317eK0apoYpQ"
                    />
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
            />

            {(!user && (
              <Link to="/sign-up" className="button">
                {(event.price / 100).toFixed(2)}$ | Buy
              </Link>
            )) ||
              (userBoughtEvent && (
                <Link to={`/event/${this.state.event._id}/experience/intro`} className="button">
                  Start Experience
                </Link>
              )) ||
              (!userBoughtEvent && (
                <Link onClick={this.handlepaymentModal} className="button">
                  {(event.price / 100).toFixed(2)}$ | Buy
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
