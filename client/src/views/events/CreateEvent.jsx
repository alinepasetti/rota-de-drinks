import React, { Component } from 'react';
import { createNewEvent } from './../../services/event';

class createEvent extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      imgURL: '',
      description: '',
      location: '',
      tags: '',
      price: '',
      badgeName: '',
      badgeImgURL: '',
      stops: [
        {
          stopName: '',
          stopImgURL: '',
          stopAddress: '',
          stopLat: '',
          stopLng: '',
          activityName: '',
          activityInstructions: '',
          activityImgURL: ''
        }
      ]
    };
    this.handleChangeInput = this.handleChangeInput.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleAddStop = this.handleAddStop.bind(this);
    this.handleChangeStop = this.handleChangeStop.bind(this);
  }

  async handleFormSubmit(event) {
    event.preventDefault();
    const tags = this.state.tags.split(' ');

    const {
      name,
      imgURL,
      description,
      location,
      price,
      badgeName,
      badgeImgURL,
      stops
    } = this.state;

    const data = {
      name,
      imgURL,
      description,
      location,
      tags,
      price,
      badgeName,
      badgeImgURL,
      stops
    };

    try {
      let newEvent = await createNewEvent({
        ...data
      });
      console.log(newEvent);
      this.props.history.push('/');
    } catch (error) {
      console.log(error);
    }
  }

  handleChangeInput(event) {
    event.preventDefault();
    const inputName = event.target.name;
    const value = event.target.value;
    this.setState({ [inputName]: value });
  }

  handleChangeStop(event, index) {
    const inputName = event.target.name;
    const value = event.target.value;

    const newStops = this.state.stops.map((stop, stopIndex) => {
      if (index !== stopIndex) return stop;
      return { ...stop, [inputName]: value };
    });

    this.setState({ stops: newStops });
  }

  handleAddStop() {
    this.setState({
      stops: this.state.stops.concat([
        {
          stopName: '',
          stopImgURL: '',
          stopAddress: '',
          stopLat: '',
          stopLng: '',
          activityName: '',
          activityInstructions: '',
          activityImgURL: ''
        }
      ])
    });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleFormSubmit} className="create-event__form">
          <h2>About Event</h2>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Event name"
            value={this.state.name}
            onChange={this.handleChangeInput}
          />
          <input
            type="text"
            name="imgURL"
            id="imgURL"
            placeholder="Event image"
            value={this.state.imgURL}
            onChange={this.handleChangeInput}
          />
          <textarea
            name="description"
            id="description"
            placeholder="Description"
            value={this.state.description}
            onChange={this.handleChangeInput}
          />
          <input
            type="text"
            name="location"
            id="location"
            placeholder="Location"
            value={this.state.location}
            onChange={this.handleChangeInput}
          />
          <input
            type="text"
            name="tags"
            id="tags"
            placeholder="Tags"
            value={this.state.tags}
            onChange={this.handleChangeInput}
          />
          <input
            type="number"
            name="price"
            id="price"
            placeholder="Price"
            value={this.state.price}
            onChange={this.handleChangeInput}
          />

          <h3>Event badge</h3>
          <input
            type="text"
            name="badgeName"
            id="badgeName"
            placeholder="Badge name"
            value={this.state.badgeName}
            onChange={this.handleChangeInput}
          />
          <input
            type="text"
            name="badgeImgURL"
            id="badgeImgURL"
            placeholder="Badge image"
            value={this.state.badgeImgURL}
            onChange={this.handleChangeInput}
          />

          {this.state.stops.map((stop, index) => (
            <div className="stops">
              <h2>About Stop #{index + 1}</h2>
              <input
                type="text"
                name="stopName"
                id="stopName"
                placeholder={`Stop #${index + 1} Name`}
                value={stop.stopName}
                onChange={event => this.handleChangeStop(event, index)}
              />
              <input
                type="text"
                name="stopImgURL"
                id="stopImgURL"
                placeholder={`Stop #${index + 1} Image URL`}
                value={stop.stopImgURL}
                onChange={event => this.handleChangeStop(event, index)}
              />
              <input
                type="text"
                name="stopAddress"
                id="stopAddress"
                placeholder={`Stop #${index + 1} Address`}
                value={stop.stopAddress}
                onChange={event => this.handleChangeStop(event, index)}
              />
              <input
                type="number"
                step="any"
                name="stopLat"
                id="stopLat"
                placeholder={`Stop #${index + 1} Latitude`}
                value={stop.stopLat}
                onChange={event => this.handleChangeStop(event, index)}
              />
              <input
                type="number"
                step="any"
                name="stopLng"
                id="stopLng"
                placeholder={`Stop #${index + 1} Longitude`}
                value={stop.stopLng}
                onChange={event => this.handleChangeStop(event, index)}
              />
              <h3>Activity within Stop #{index + 1}</h3>
              <input
                type="text"
                name="activityName"
                id="activityName"
                placeholder={`Activity Name`}
                value={stop.activityName}
                onChange={event => this.handleChangeStop(event, index)}
              />
              <input
                type="text"
                name="activityInstructions"
                id="activityInstructions"
                placeholder={`Activity Instructions`}
                value={stop.activityInstructions}
                onChange={event => this.handleChangeStop(event, index)}
              />
              <input
                type="text"
                name="activityImgURL"
                id="activityImgURL"
                placeholder={`Activity Image URL`}
                value={stop.activityImgURL}
                onChange={event => this.handleChangeStop(event, index)}
              />

              {/* <button type="button" onClick={this.handleRemoveStop(index)} className="small">
                -
              </button> */}
            </div>
          ))}
          <button type="button" onClick={this.handleAddStop}>
            Add a new stop
          </button>
          <br />
          <button>Create event</button>
        </form>
      </div>
    );
  }
}

export default createEvent;
