import React from 'react';
import { Link } from 'react-router-dom';

function EventCard(props) {
  return (
    <Link to={`/event/${props.event._id}`} className="event__card">
      <img src={props.event.imgURL} alt={props.event.name} />
      <div>
        <h3>{props.event.name}</h3>
        <div>
          <p>
            <span>{(props.event.price / 100).toFixed(2)}</span> €
          </p>
          <div>
            <img src="./group.svg" alt="Group icon" />
            <p>{props.event.attendees.length} people are going</p>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default EventCard;
