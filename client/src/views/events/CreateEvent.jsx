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
      stopName: '',
      stopImgURL: '',
      stopAddress: '',
      stopLat: '',
      stopLng: '',
      activityName: '',
      activityInstructions: '',
      activityImgURL: '',
      stopName2: '',
      stopImgURL2: '',
      stopAddress2: '',
      stopLat2: '',
      stopLng2: '',
      activityName2: '',
      activityInstructions2: '',
      activityImgURL2: '',
      stopName3: '',
      stopImgURL3: '',
      stopAddress3: '',
      stopLat3: '',
      stopLng3: '',
      activityName3: '',
      activityInstructions3: '',
      activityImgURL3: ''
    };
    this.changeInput = this.changeInput.bind(this);
    this.handleFormSubmission = this.handleFormSubmission.bind(this);
  }

  async handleFormSubmission(event) {
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
      stopName,
      stopImgURL,
      stopAddress,
      stopLat,
      stopLng,
      activityName,
      activityInstructions,
      activityImgURL,
      stopName2,
      stopImgURL2,
      stopAddress2,
      stopLat2,
      stopLng2,
      activityName2,
      activityInstructions2,
      activityImgURL2,
      stopName3,
      stopImgURL3,
      stopAddress3,
      stopLat3,
      stopLng3,
      activityName3,
      activityInstructions3,
      activityImgURL3
    } = this.state;
    const data = {
      name,
      imgURL,
      description,
      location,
      tags,
      price: Number(price),
      badgeName,
      badgeImgURL,
      stopName,
      stopImgURL,
      stopAddress,
      stopLat: Number(stopLat),
      stopLng: Number(stopLng),
      activityName,
      activityInstructions,
      activityImgURL,
      stopName2,
      stopImgURL2,
      stopAddress2,
      stopLat2,
      stopLng2,
      activityName2,
      activityInstructions2,
      activityImgURL2,
      stopName3,
      stopImgURL3,
      stopAddress3,
      stopLat3,
      stopLng3,
      activityName3,
      activityInstructions3,
      activityImgURL3
    };
    try {
      await createNewEvent({
        ...data
      });
      this.props.history.push('/');
    } catch (error) {
      console.log(error);
    }
  }
  changeInput(event) {
    event.preventDefault();
    const inputName = event.target.name;
    const value = event.target.value;
    this.setState({ [inputName]: value });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleFormSubmission} className="create-event__form">
          <h2>About Event</h2>
          <input
            name="name"
            id="name"
            placeholder="Event name"
            value={this.state.name}
            onChange={this.changeInput}
          />
          <input
            type="text"
            name="imgURL"
            id="imgURL"
            placeholder="Event image"
            value={this.state.imgURL}
            onChange={this.changeInput}
          />
          <textarea
            name="description"
            id="description"
            placeholder="Description"
            value={this.state.description}
            onChange={this.changeInput}
          />
          <input
            name="location"
            id="location"
            placeholder="Location"
            value={this.state.location}
            onChange={this.changeInput}
          />
          <input
            name="tags"
            id="tags"
            placeholder="Tags"
            value={this.state.tags}
            onChange={this.changeInput}
          />
          <input
            type="number"
            name="price"
            id="price"
            placeholder="Price"
            value={this.state.price}
            onChange={this.changeInput}
          />

          <h3>Event badge</h3>
          <input
            name="badgeName"
            id="badgeName"
            placeholder="Badge name"
            value={this.state.badgeName}
            onChange={this.changeInput}
          />
          <input
            name="badgeImgURL"
            id="badgeImgURL"
            placeholder="Badge image"
            value={this.state.badgeImgURL}
            onChange={this.changeInput}
          />

          <h2>About 1st stop</h2>
          <input
            name="stopName"
            id="stopName"
            placeholder="Stop name"
            value={this.state.stopName}
            onChange={this.changeInput}
          />
          <input
            name="stopImgURL"
            id="stopImgURL"
            placeholder="Image URL"
            value={this.state.stopImgURL}
            onChange={this.changeInput}
          />
          <input
            name="stopAddress"
            id="stopAddress"
            placeholder="Address"
            value={this.state.stopAddress}
            onChange={this.changeInput}
          />
          <input
            type="number"
            name="stopLat"
            id="stopLat"
            placeholder="Latitude"
            value={this.state.stopLat}
            onChange={this.changeInput}
          />
          <input
            type="number"
            name="stopLng"
            id="stopLng"
            placeholder="Longitude"
            value={this.state.stopLng}
            onChange={this.changeInput}
          />

          <h3>Activity within stop 1</h3>
          <input
            name="activityName"
            id="activityName"
            placeholder="Activity Name"
            value={this.state.activityName}
            onChange={this.changeInput}
          />
          <input
            name="activityInstructions"
            id="activityInstructions"
            placeholder="Instructions"
            value={this.state.activityInstructions}
            onChange={this.changeInput}
          />
          <input
            name="activityImgURL"
            id="activityImgURL"
            placeholder="Activity's Image"
            value={this.state.stopAddress}
            onChange={this.changeInput}
          />

          <h2>About 2nd stop</h2>
          <input
            name="stopName2"
            id="stopName2"
            placeholder="Stop name"
            value={this.state.stopName2}
            onChange={this.changeInput}
          />
          <input
            name="stopImgURL2"
            id="stopImgURL2"
            placeholder="Image URL"
            value={this.state.stopImgURL2}
            onChange={this.changeInput}
          />
          <input
            name="stopAddress2"
            id="stopAddress2"
            placeholder="Address"
            value={this.state.stopAddress2}
            onChange={this.changeInput}
          />
          <input
            type="number"
            name="stopLat2"
            id="stopLat2"
            placeholder="Latitude"
            value={this.state.stopLat2}
            onChange={this.changeInput}
          />
          <input
            type="number"
            name="stopLng2"
            id="stopLng2"
            placeholder="Longitude"
            value={this.state.stopLng2}
            onChange={this.changeInput}
          />
          <h3>Activity within stop 2</h3>
          <input
            name="activityName2"
            id="activityName2"
            placeholder="Activity Name"
            value={this.state.activityName2}
            onChange={this.changeInput}
          />
          <input
            name="activityInstructions2"
            id="activityInstructions2"
            placeholder="Instructions"
            value={this.state.activityInstructions2}
            onChange={this.changeInput}
          />
          <input
            name="activityImgURL2"
            id="activityImgURL2"
            placeholder="Activity's Image"
            value={this.state.activityImgURL2}
            onChange={this.changeInput}
          />

          <h2>About 3rd stop</h2>
          <input
            name="stopName3"
            id="stopName3"
            placeholder="Stop name"
            value={this.state.stopName3}
            onChange={this.changeInput}
          />
          <input
            name="stopImgURL3"
            id="stopImgURL3"
            placeholder="Image URL"
            value={this.state.stopImgURL3}
            onChange={this.changeInput}
          />
          <input
            name="stopAddress3"
            id="stopAddress3"
            placeholder="Address"
            value={this.state.stopAddress3}
            onChange={this.changeInput}
          />
          <input
            type="number"
            name="stopLat3"
            id="stopLat3"
            placeholder="Latitude"
            value={this.state.stopLat3}
            onChange={this.changeInput}
          />
          <input
            type="number"
            name="stopLng3"
            id="stopLng3"
            placeholder="Longitude"
            value={this.state.stopLng3}
            onChange={this.changeInput}
          />

          <h3>Activity within stop 3</h3>
          <input
            name="activityName3"
            id="activityName3"
            placeholder="Activity Name"
            value={this.state.activityName3}
            onChange={this.changeInput}
          />
          <input
            name="activityInstructions3"
            id="activityInstructions3"
            placeholder="Instructions"
            value={this.state.activityInstructions3}
            onChange={this.changeInput}
          />
          <input
            name="activityImgURL3"
            id="activityImgURL3"
            placeholder="Activity's Image"
            value={this.state.activityImgURL3}
            onChange={this.changeInput}
          />
          <button>Create event</button>
        </form>
      </div>
    );
  }
}

export default createEvent;
