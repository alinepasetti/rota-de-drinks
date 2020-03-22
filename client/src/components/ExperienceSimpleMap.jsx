import React, { Component, Fragment } from 'react';
import GoogleMapReact from 'google-map-react';
import './../App.scss';
const PrimaryMarker = () => (
  <img
    alt="pin"
    className="map__pin"
    src="https://www.freepnglogos.com/uploads/pin-png/location-pin-connectsafely-37.png"
  />
);
const DisabledMarker = () => (
  <img alt="pin" className="map__pin" src="https://image.flaticon.com/icons/png/512/23/23394.png" />
);
const Wrapping = () => <Fragment></Fragment>;

class SimpleMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lng: [],
      lat: []
    };
    this.stopsLat = this.stopsLat.bind(this);
    this.stopsLng = this.stopsLng.bind(this);
  }

  static defaultProps = {
    zoom: 11
  };

  componentDidMount() {
    this.stopsLng();
    this.stopsLat();
  }

  stopsLng() {
    const lng = [];

    this.props.stops.map(stop => {
      lng.push(stop.location.coordinates[0].$numberDecimal);
    });
    return this.setState({ lng: lng });
  }

  stopsLat() {
    const lat = [];
    this.props.stops.map(stop => {
      lat.push(stop.location.coordinates[1].$numberDecimal);
    });
    return this.setState({ lat: lat });
  }

  render() {
    const lat1 = this.state.lat[0];
    const lng1 = this.state.lng[0];
    const lat2 = this.state.lat[1];
    const lng2 = this.state.lng[1];
    const lat3 = this.state.lat[2];
    const lng3 = this.state.lng[2];
    const center = {
      lat: Number(lat1),
      lng: Number(lng1)
    };
    // console.log(lat1, lat2, lat3);
    return (
      <div className="simple__map">
        {this.state.lng.length > 0 && this.props.stop == 0 && (
          <GoogleMapReact
            bootstrapURLKeys={{ key: process.env.REACT_APP_MAPS_KEY }}
            defaultCenter={center}
            defaultZoom={this.props.zoom}
          >
            {this.state.lng.length > 0 && <PrimaryMarker lat={lat1} lng={lng1} />}
            {this.state.lng.length > 0 && <DisabledMarker lat={lat2} lng={lng2} />}
            {this.state.lng.length > 0 && <DisabledMarker lat={lat3} lng={lng3} />}
          </GoogleMapReact>
        )}
        {this.state.lng.length > 0 && this.props.stop == 1 && (
          <GoogleMapReact
            bootstrapURLKeys={{ key: process.env.REACT_APP_MAPS_KEY }}
            defaultCenter={center}
            defaultZoom={this.props.zoom}
          >
            {this.state.lng.length > 0 && <DisabledMarker lat={lat1} lng={lng1} />}
            {this.state.lng.length > 0 && <PrimaryMarker lat={lat2} lng={lng2} />}
            {this.state.lng.length > 0 && <DisabledMarker lat={lat3} lng={lng3} />}
          </GoogleMapReact>
        )}
        {this.state.lng.length > 0 && this.props.stop == 2 && (
          <GoogleMapReact
            bootstrapURLKeys={{ key: process.env.REACT_APP_MAPS_KEY }}
            defaultCenter={center}
            defaultZoom={this.props.zoom}
          >
            {this.state.lng.length > 0 && <DisabledMarker lat={lat1} lng={lng1} />}
            {this.state.lng.length > 0 && <DisabledMarker lat={lat2} lng={lng2} />}
            {this.state.lng.length > 0 && <PrimaryMarker lat={lat3} lng={lng3} />}
          </GoogleMapReact>
        )}
      </div>
    );
  }
}

export default SimpleMap;
