import React, { Component } from 'react';
import './App.scss';
import { Route, Link, Switch } from 'react-router-dom';
import HomeView from './views/Home';
import ProfileView from './views/user/Profile';
import ProfileEditView from './views/user/ProfileEdit';
import EventsListView from './views/events/EventsList';
import EventSingleView from './views/events/EventSingle';
import ExperienceIntroView from './views/experience/ExperienceIntro';
import ExperienceStepView from './views/experience/ExperienceStep';
import ExperienceFinishView from './views/experience/ExperienceFinish';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/ProtectedRoute';
import SignInView from './views/authentication/SignIn';
import SignUpView from './views/authentication/SignUp';
import { loadLoggedUserInformation } from './services/user';

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: null
    };
    this.updateUserInformation = this.updateUserInformation.bind(this);
  }

  async componentDidMount() {
    try {
      const loggedUser = await loadLoggedUserInformation();
      this.updateUserInformation(loggedUser);
    } catch (error) {
      console.log(error);
    }
  }

  updateUserInformation(user) {
    this.setState({
      user
    });
  }

  render() {
    return (
      <div className="App">
        <NavBar user={this.state.user} updateUserInformation={this.updateUserInformation} />
        <Switch>
          <Route path="/" exact component={HomeView} />
          <ProtectedRoute
            path="/sign-in"
            exact
            authorized={!this.state.user}
            redirect={'/'}
            render={props => (
              <SignInView {...props} updateUserInformation={this.updateUserInformation} />
            )}
          />
          <ProtectedRoute
            path="/sign-up"
            authorized={!this.state.user}
            redirect={'/'}
            render={props => (
              <SignUpView {...props} updateUserInformation={this.updateUserInformation} />
            )}
          />
          <ProtectedRoute
            path="/profile/:userId/edit"
            authorized={this.state.user}
            redirect={'/sign-in'}
            render={props => (
              <ProfileEditView
                {...props}
                updateUserInformation={this.updateUserInformation}
                user={this.state.user}
              />
            )}
          />
          <Route
            path="/profile/:userId"
            exact
            render={props => <ProfileView user={this.state.user} {...props} />}
          />
          <Route path="/events" exact component={EventsListView} />
          <Route path="/event/:eventId" exact component={EventSingleView} />
          <Route path="/event/:eventId/experience/intro" exact component={ExperienceIntroView} />
          <Route path="/event/:eventId/experience/finish" exact component={ExperienceFinishView} />
          <Route path="/event/:eventId/experience/:spotId" exact component={ExperienceStepView} />
        </Switch>
      </div>
    );
  }
}

export default App;
