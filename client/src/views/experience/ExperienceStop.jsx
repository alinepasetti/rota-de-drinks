import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { findOneEvent } from './../../services/event';
import SimpleMap from './../../components/ExperienceSimpleMap';
import './experience.scss';

class ExperienceStop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      event: null,
      currentPage: 0,
      totalPages: 0
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
    const totalPages = event.stops.length;
    this.setState({ event, totalPages });
  }

  nextPage() {
    this.setState(previousState => {
      return {
        currentPage: previousState.currentPage + 1
      };
    });
  }

  previousPage() {
    this.setState(previousState => {
      return {
        currentPage: previousState.currentPage - 1
      };
    });
  }

  render() {
    const event = this.state.event;
    const currentPage = this.state.currentPage;
    const totalPages = this.state.totalPages;

    return (
      <div className="experience__stop__page">
        {event && (
          <Fragment>
            <header>
              <div className="experience__title">
                <h3>{event.name}</h3>
                <h1>{event.stops[currentPage].name}</h1>
              </div>
              <img src={event.stops[currentPage].imgURL} alt={event.name} />
            </header>
            <div className="experience__stop__information">
              <img src="/location.svg" />
              <p>Address: {event.stops[currentPage].address}</p>
            </div>
            <div className="experience__stop__activity">
              <h3>What's your task</h3>
              <p>
                <strong>{event.stops[currentPage].activity.name}</strong>
              </p>
              <p>{event.stops[currentPage].activity.instructions}</p>
              <img
                src={event.stops[currentPage].activity.imgURL}
                alt={event.stops[currentPage].activity.name}
              />
            </div>
            <div className="experience__stop__map">
              <h3>What's planned</h3>
              <ul>
                {event.stops.map((stop, index) => (
                  <li key={stop.name}>
                    {(currentPage >= index && (
                      <span className="location__list__selected">{index + 1}</span>
                    )) || <span className="location__list">{index + 1}</span>}
                    {stop.name} - {stop.address}
                  </li>
                ))}
              </ul>
              {<SimpleMap stops={event.stops} stop={currentPage} />}
            </div>
            <div className="experience__stop__buttons">
              {(currentPage === 0 && (
                <Link to={`/event/${event._id}/experience/intro`} className="previous__button">
                  Back
                </Link>
              )) || (
                <Link
                  to={`/event/${event._id}/experience/${event.stops[currentPage - 1]._id}`}
                  onClick={this.previousPage}
                  className="previous__button"
                >
                  Back
                </Link>
              )}
              {(currentPage === totalPages - 1 && (
                <Link to={`/event/${event._id}/experience/finish`} className="next__button">
                  Next
                </Link>
              )) || (
                <Link
                  to={`/event/${event._id}/experience/${event.stops[currentPage + 1]._id}`}
                  onClick={this.nextPage}
                  className="next__button"
                >
                  Next
                </Link>
              )}
            </div>
          </Fragment>
        )}
      </div>
    );
  }
}

export default ExperienceStop;
