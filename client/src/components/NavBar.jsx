import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import './NavBar.scss';
import { signOut } from './../services/authentication';

const NavBar = props => {
  const handleSignOut = () => {
    signOut()
      .then(() => {
        props.updateUserInformation(null);
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <nav className="nav-bar">
      <Link to="/">Home</Link>
      {(props.user && (
        <Fragment>
          <Link to={`/profile/${props.user._id}`}>
            Profile
            {/* <div className="profile__picture">
              <img src={props.user.picture} alt={props.user.firstName} />
            </div> */}
          </Link>
          <button onClick={handleSignOut}>Sign Out</button>
        </Fragment>
      )) || (
        <Fragment>
          <Link to="/sign-in">Sign In</Link>
          <Link to="/sign-up">Sign Up</Link>
        </Fragment>
      )}
    </nav>
  );
};

export default NavBar;
