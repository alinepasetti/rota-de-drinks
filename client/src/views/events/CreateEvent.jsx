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
      stopName: '',
      stopImgURL: '',
      stopAddress: '',
      stopLat: '',
      stopLng: '',
      stopName2: '',
      stopImgURL2: '',
      stopAddress2: '',
      stopLat2: '',
      stopLng2: '',
      stopName3: '',
      stopImgURL3: '',
      stopAddress3: '',
      stopLat3: '',
      stopLng3: ''
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
      stopName,
      stopImgURL,
      stopAddress,
      stopLat,
      stopLng,
      stopName2,
      stopImgURL2,
      stopAddress2,
      stopLat2,
      stopLng2,
      stopName3,
      stopImgURL3,
      stopAddress3,
      stopLat3,
      stopLng3
    } = this.state;
    const data = {
      name,
      imgURL,
      description,
      location,
      tags,
      price: Number(price),
      stopName,
      stopImgURL,
      stopAddress,
      stopLat: Number(stopLat),
      stopLng: Number(stopLng),
      stopName2,
      stopImgURL2,
      stopAddress2,
      stopLat2,
      stopLng2,
      stopName3,
      stopImgURL3,
      stopAddress3,
      stopLat3,
      stopLng3
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
          <button>Create event</button>
        </form>
      </div>
    );
  }
}

export default createEvent;
