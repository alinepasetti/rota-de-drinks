import React, { Component } from 'react';
import { signUp } from './../../services/authentication';

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
        <form onSubmit={this.handleFormSubmission}>
          <label htmlFor="firstName">First Name</label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            placeholder="First Name"
            onChange={this.handleInputChange}
            value={this.state.firstName}
          />
          <label htmlFor="lastName">Last Name</label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            placeholder="Last Name"
            onChange={this.handleInputChange}
            value={this.state.lastName}
          />
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Email"
            onChange={this.handleInputChange}
            value={this.state.email}
          />
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Password"
            onChange={this.handleInputChange}
            value={this.state.password}
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
