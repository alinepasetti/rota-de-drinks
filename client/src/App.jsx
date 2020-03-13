import React, { Component } from 'react';
import './App.scss';
import { Route, Link, Switch } from 'react-router-dom';
import HomeView from './views/Home';
import ProfileView from './views/user/Profile';
import EventsListView from './views/events/EventsList';
import EventSingleView from './views/events/EventSingle';
import ExperienceIntroView from './views/experience/ExperienceIntro';
import ExperienceStepView from './views/experience/ExperienceStep';
import ExperienceFinishView from './views/experience/ExperienceFinish';
import NavBar from './components/NavBar';
import SignInView from './views/authentication/SignIn';
import SignUpView from './views/authentication/SignUp';
// import ProtectedRoute from './components/ProtectedRoute';

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: null
    };
  }

  componentDidMount() {
    // loadUserInformation()
    //   .then(user => {
    //     this.updateUserInformation(user);
    //     this.setState({
    //       loaded: true
    //     });
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   });
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
          <Route
            path="/sign-in"
            exact
            component={SignInView}
            updateUserInformation={this.updateUserInformation}
          />
          <Route
            path="/sign-up"
            exact
            component={SignUpView}
            updateUserInformation={this.updateUserInformation}
          />
          <Route path="/profile" exact component={ProfileView} />
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
