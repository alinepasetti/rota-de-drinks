import React, { Component, Fragment } from 'react';
import './App.scss';
import { Route, Switch } from 'react-router-dom';
import HomeView from './views/Home';
import ProfileView from './views/user/Profile';
import ProfileEditView from './views/user/ProfileEdit';
import EventsListView from './views/events/EventsList';
import EventSingleView from './views/events/EventSingle';
import CreateEventView from './views/events/CreateEvent';
import ExperienceIntroView from './views/experience/ExperienceIntro';
import ExperienceStopView from './views/experience/ExperienceStop';
import ExperienceFinishView from './views/experience/ExperienceFinish';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/ProtectedRoute';
import SignInView from './views/authentication/SignIn';
import SignUpView from './views/authentication/SignUp';
import PaymentMethodListView from './views/payment/PaymentMethodList';
import PaymentMethodCreateView from './views/payment/PaymentMethodCreate';
import { loadLoggedUserInformation } from './services/user';

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: null,
      loaded: false
    };
    this.updateUserInformation = this.updateUserInformation.bind(this);
  }

  async componentDidMount() {
    try {
      const loggedUser = await loadLoggedUserInformation();
      this.updateUserInformation(loggedUser);
      this.setState({
        loaded: true
      });
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
        {this.state.loaded && (
          <Fragment>
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
                exact
                authorized={!this.state.user}
                redirect={'/'}
                render={props => (
                  <SignUpView {...props} updateUserInformation={this.updateUserInformation} />
                )}
              />
              <ProtectedRoute
                path="/profile/:userId/edit"
                exact
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
              <Route path="/events/create" exact component={CreateEventView} />
              <ProtectedRoute
                path="/event/:eventId/experience/intro"
                exact
                authorized={this.state.user}
                redirect={'/sign-in'}
                render={props => <ExperienceIntroView {...props} user={this.state.user} />}
              />
              <ProtectedRoute
                path="/event/:eventId/experience/finish"
                exact
                authorized={this.state.user}
                redirect={'/sign-in'}
                render={props => <ExperienceFinishView {...props} user={this.state.user} />}
              />
              <ProtectedRoute
                path="/event/:eventId/experience/:stopId"
                exact
                authorized={this.state.user}
                redirect={'/sign-in'}
                render={props => <ExperienceStopView {...props} user={this.state.user} />}
              />
              <Route
                path="/event/:eventId"
                exact
                render={props => <EventSingleView user={this.state.user} {...props} />}
              />
              <ProtectedRoute
                authorized={this.state.user}
                redirect="/sign-in"
                path="/:userId/payment-method/list"
                render={props => <PaymentMethodListView user={this.state.user} {...props} />}
              />
              <ProtectedRoute
                authorized={this.state.user}
                redirect="/sign-in"
                path="/:userId/payment-method/create"
                render={props => <PaymentMethodCreateView user={this.state.user} {...props} />}
              />
            </Switch>
          </Fragment>
        )}
      </div>
    );
  }
}

export default App;
