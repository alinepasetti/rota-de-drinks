import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

class SimpleMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lng: [],
      lat: []
    };
    this.stopsLat = this.stopsLat.bind(this);
  }
  static defaultProps = {
    center: {
      lat: -27.0016,
      lng: -48.6379
    },
    zoom: 13
  };
  componentDidMount() {
    this.stopsLng();
    this.stopsLng();
  }
  async stopsLng() {
    const lng = [];

    await this.props.stops.map(stop => {
      lng.push(stop.location.coordinates[0].$numberDecimal);
    });
    return this.setState({ lng: lng });
  }
  stopsLat() {
    const lat = [];
    this.props.stops.map(stop => {
      lat.push(stop.location.coordinates[0].$numberDecimal);
    });
    return this.setState({ lat });
  }
  render() {
    return (
      <div className="simple__map">
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyBrJ1f_9MB0iFA2zFsHIbIK8sGWU91aQr8' }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          {this.state.lng.length > 0 &&
            this.state.lng.map(stop => (
              <AnyReactComponent lat={stop} lng={stop} text="My Marker" />
            ))}
        </GoogleMapReact>
      </div>
    );
  }
}

export default SimpleMap;
