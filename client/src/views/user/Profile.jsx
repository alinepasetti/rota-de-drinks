import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ProfileView extends Component {
  render() {
    // const user = this.props.user;
    return (
      <div>
        <h1>User's profile</h1>
        {/* <figure>
          <img src={user.picture} alt={user.name} />
        </figure>
        <div>
          <h1>{user.name}</h1>
          <span>{user.email}</span>
        </div>
        <Link to="/private/edit">Edit Profile</Link>
        <Link to="/payment-method/list">View Payment Methods</Link> */}
      </div>
    );
  }
}

export default ProfileView;
