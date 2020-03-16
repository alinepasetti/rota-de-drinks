import React, { Component } from 'react';
import { editUserInformation } from '../../services/user';

class ProfileEditView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: '',
      firstName: '',
      lastName: '',
      email: '',
      picture: '',
      about: '',
      city: ''
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleFormSubmission = this.handleFormSubmission.bind(this);
    this.handleFileInputChange = this.handleFileInputChange.bind(this);
  }

  componentDidMount() {
    this.setState({
      userId: this.props.user._id,
      firstName: this.props.user.firstName,
      lastName: this.props.user.lastName,
      email: this.props.user.email,
      city: this.props.user.city,
      about: this.props.user.about,
      picture: null
    });
  }

  async handleFormSubmission(event) {
    event.preventDefault();
    const { userId, firstName, lastName, email, city, about, picture } = this.state;
    try {
      const user = await editUserInformation({
        userId,
        firstName,
        lastName,
        email,
        city,
        about,
        picture
      });
      this.props.updateUserInformation(user);
      this.props.history.push(`/profile/${userId}`);
    } catch (error) {
      console.log(error);
    }
  }

  handleFileInputChange(event) {
    // console.dir(event.target);
    const { name, files } = event.target;
    this.setState({
      [name]: files[0]
    });
  }

  handleInputChange(event) {
    const { value, name } = event.target;
    this.setState({
      [name]: value
    });
  }

  render() {
    const user = this.props.user;
    return (
      <div>
        <figure className="profile__picture">
          <img src={user.picture} alt={user.firstName} />
        </figure>

        <form onSubmit={this.handleFormSubmission}>
          <label htmlFor="firstName">First Name</label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            placeholder="First Name"
            onChange={this.handleInputChange}
            value={this.state.firstName}
            required
          />
          <label htmlFor="lastName">Last Name</label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            placeholder="Last Name"
            onChange={this.handleInputChange}
            value={this.state.lastName}
            required
          />
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Email"
            onChange={this.handleInputChange}
            value={this.state.email}
            required
          />
          <label htmlFor="city">City</label>
          <input
            id="city"
            name="city"
            type="text"
            placeholder="City"
            onChange={this.handleInputChange}
            value={this.state.city}
          />
          <label htmlFor="about">About</label>
          <input
            id="about"
            name="about"
            type="text"
            placeholder="About"
            onChange={this.handleInputChange}
            value={this.state.about}
          />
          <label htmlFor="picture">Profile Picture</label>
          <input type="file" id="picture" name="picture" onChange={this.handleFileInputChange} />
          <button>Update Profile</button>
        </form>
      </div>
    );
  }
}

export default ProfileEditView;

// {{#if userHasInfo.about}}
//   <label for="input-about">About Me</label>
//   <textarea id="input-about" name="about">{{user.about}}</textarea>
// {{else}}
//   <label for="input-about">About Me</label>
//   <textarea id="input-about" name="about">Write something about yourself</textarea>
