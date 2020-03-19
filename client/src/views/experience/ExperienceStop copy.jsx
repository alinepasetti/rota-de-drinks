import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { findOneEvent } from './../../services/event';
import SimpleMap from './../../components/ExperienceSimpleMap';
import './../../App.scss';

class ExperienceStop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      event: null,
      page: 0
    };
    this.nextPage = this.nextPage.bind(this);
    this.previousPage = this.previousPage.bind(this);
  }

  async componentDidMount() {
    await this.fetchData();
  }

  async fetchData() {
    const eventId = this.props.match.params.eventId;
    const event = await findOneEvent(eventId);
    this.setState({ event });
  }

  nextPage() {
    this.setState(previousState => {
      return {
        page: previousState.page + 1
      };
    });
  }

  previousPage() {
    this.setState(previousState => {
      return {
        page: previousState.page - 1
      };
    });
  }

  render() {
    const event = this.state.event;
    const page = this.state.page;
    console.log(page, event.stops[page], page + 1);

    return (
      <div className="experience__stop__page">
        {event && (
          <Fragment>
            <header>
              <div className="experience__title">
                <h5>{event.name}</h5>
                <h1>{event.stops[page].name}</h1>
              </div>
              <img src={event.stops[page].imgURL} alt={event.name} />
            </header>
            <div className="experience__stop__information">
              <p>Address: {event.stops[page].address}</p>
            </div>
            <div className="experience__stop__activity">
              <div>
                <h3>What's your task</h3>
                <p>
                  <strong>{event.stops[page].activity.name}</strong>
                </p>
                <p>{event.stops[page].activity.instructions}</p>
              </div>
              <img src={event.stops[page].activity.imgURL} alt={event.stops[page].activity.name} />
            </div>
            <div className="experience__stop__map">
              <h3>Map</h3>
              {<SimpleMap stops={event.stops} stop={page} />}
            </div>
            <div className="experience__stop__buttons">
              {(event.stops[0] && (
                <Link to={`/event/${event._id}/experience/intro`} className="previous__button">
                  Back
                </Link>
              )) || (
                <Link
                  to={`/event/${event._id}/experience/${event.stops[page - 1]._id}`}
                  onClick={this.previousPage}
                  className="previous__button"
                >
                  Back
                </Link>
              )}
              <Link
                to={`/event/${event._id}/experience/${event.stops[page + 1]._id}`}
                onClick={this.nextPage}
                className="next__button"
              >
                Next
              </Link>
            </div>
          </Fragment>
        )}
        {/*event && page === 1 && (
          <Fragment>
            <header>
              <div className="experience__title">
                <h5>{event.name}</h5>
                <h1>{event.stops[1].name}</h1>
              </div>
              <img src={event.stops[1].imgURL} alt={event.name} />
            </header>
            <div className="experience__stop__information">
              <p>Address: {event.stops[1].address}</p>
            </div>
            <div className="experience__stop__activity">
              <div>
                <h3>What's your task</h3>
                <p>
                  <strong>{event.stops[1].activity.name}</strong>
                </p>
                <p>{event.stops[1].activity.instructions}</p>
              </div>
              <img src={event.stops[1].activity.imgURL} alt={event.stops[1].activity.name} />
            </div>
            <div className="experience__stop__map">
              <h3>Map</h3>
              {<SimpleMap stops={event.stops} stop={page} />}
            </div>
            <div className="experience__stop__buttons">
              <Link
                to={`/event/${event._id}/experience/${event.stops[0]._id}`}
                onClick={this.previousPage}
                className="previous__button"
              >
                Back
              </Link>
              <Link
                to={`/event/${event._id}/experience/${event.stops[2]._id}`}
                onClick={this.nextPage}
                className="next__button"
              >
                Next
              </Link>
            </div>
          </Fragment>
        )}
        {event && page === 2 && (
          <Fragment>
            <header>
              <div className="experience__title">
                <h5>{event.name}</h5>
                <h1>{event.stops[2].name}</h1>
              </div>
              <img src={event.stops[2].imgURL} alt={event.name} />
            </header>
            <div className="experience__stop__information">
              <p>Address: {event.stops[2].address}</p>
            </div>
            <div className="experience__stop__activity">
              <div>
                <h3>What's your task</h3>
                <p>
                  <strong>{event.stops[2].activity.name}</strong>
                </p>
                <p>{event.stops[2].activity.instructions}</p>
              </div>
              <img src={event.stops[2].activity.imgURL} alt={event.stops[2].activity.name} />
            </div>
            <div className="experience__stop__map">
              <h3>Map</h3>
              {<SimpleMap stops={event.stops} stop={page} />}
            </div>
            <div className="experience__stop__buttons">
              <Link
                to={`/event/${event._id}/experience/${event.stops[1]._id}`}
                onClick={this.previousPage}
                className="previous__button"
              >
                Back
              </Link>
              <Link to={`/event/${event._id}/experience/finish`} className="next__button">
                Next
              </Link>
            </div>
          </Fragment>
        )*/}
      </div>
    );
  }
}

export default ExperienceStop;
