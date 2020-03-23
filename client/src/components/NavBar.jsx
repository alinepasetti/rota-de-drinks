import React, { Fragment, Component } from 'react';
import { Link } from 'react-router-dom';
import './NavBar.scss';
import { signOut } from './../services/authentication';

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuOpen: false
    };
    this.handleSignOut = this.handleSignOut.bind(this);
    this.displayDropdown = this.displayDropdown.bind(this);
  }
  handleSignOut = () => {
    signOut()
      .then(() => {
        this.props.updateUserInformation(null);
      })
      .catch(error => {
        console.log(error);
      });
  };
  displayDropdown = () => {
    this.setState(previousState => ({ menuOpen: !previousState.menuOpen }));
  };

  render() {
    return (
      <nav className="nav-bar">
        <Link to="/" className="logo">
          Hey <span className="orange">Friday</span>
        </Link>

        {(this.props.user && (
          <Fragment>
            <div onClick={this.displayDropdown} className="nav__profile__picture">
              <img
                src={
                  this.props.user
                    ? this.props.user.picture
                    : 'https://cdn2.vectorstock.com/i/1000x1000/20/76/man-avatar-profile-vector-21372076.jpg'
                }
                alt={this.props.user.firstName}
              />
            </div>
            {this.state.menuOpen && (
              <div className="profile__dropdown">
                <Link
                  onClick={this.displayDropdown}
                  className="nav-bar__hidden-links"
                  to={`/profile/${this.props.user._id}`}
                >
                  Profile
                </Link>
                <button
                  onClick={this.displayDropdown}
                  className="nav-bar__hidden-links"
                  onClick={this.handleSignOut}
                >
                  Sign Out
                </button>
              </div>
            )}
          </Fragment>
        )) || (
          <div className="nav-bar-links">
            <Link to="/sign-in">Sign In</Link>
            <Link className="orange" to="/sign-up">
              Sign Up
            </Link>
          </div>
        )}
      </nav>
    );
  }
}

export default NavBar;
