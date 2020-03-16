import React, { Component } from 'react';
import { signUp } from './../../services/authentication';
import './Authentication.scss';

class SignUpView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleFormSubmission = this.handleFormSubmission.bind(this);
  }

  async handleFormSubmission(event) {
    event.preventDefault();
    const { firstName, lastName, email, password } = this.state;
    try {
      const user = await signUp({
        firstName,
        lastName,
        email,
        password
      });
      this.props.updateUserInformation(user);
      this.props.history.push('/');
    } catch (error) {
      console.log(error);
    }
  }

  handleInputChange(event) {
    const { value, name } = event.target;
    this.setState({
      [name]: value
    });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleFormSubmission} className="authentication__form">
          <input
            id="firstName"
            name="firstName"
            type="text"
            placeholder="First Name"
            onChange={this.handleInputChange}
            value={this.state.firstName}
            aria-label="First Name"
          />
          <input
            id="lastName"
            name="lastName"
            type="text"
            placeholder="Last Name"
            onChange={this.handleInputChange}
            value={this.state.lastName}
            aria-label="Last Name"
          />
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Email"
            onChange={this.handleInputChange}
            value={this.state.email}
            aria-label="Email"
          />
          {/* <label htmlFor="password">Password</label> */}
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Password"
            onChange={this.handleInputChange}
            value={this.state.password}
            aria-label="Password"
          />
          {this.state.password && this.state.password.length < 8 && (
            <small>Password is too short!</small>
          )}
          <button disabled={this.state.password.length < 5}>Sign Up</button>
        </form>
      </div>
    );
  }
}

export default SignUpView;
