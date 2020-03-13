import React from 'react';
import { Link } from 'react-router-dom';

function EventCard(props) {
  return (
    <Link to={`/event/${props.event._id}`} className="event__card">
      <img src={props.event.imgURL} alt={props.event.name} />
      <p>{props.event.name}</p>
      <p>{(props.event.price / 100).toFixed(2)} $</p>
    </Link>
  );
}

export default EventCard;
