import React from 'react';
import './App.scss';
import { Route, Link, Switch } from 'react-router-dom';
import HomeView from './views/Home';
import EventsListView from './views/events/EventsList';
import EventSingleView from './views/events/EventSingle';
import ExperienceIntroView from './views/experience/ExperienceIntro';
import ExperienceStepView from './views/experience/ExperienceStep';
import ExperienceFinishView from './views/experience/ExperienceFinish';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/" exact component={HomeView} />
        <Route path="/events" exact component={EventsListView} />
        <Route path="/event/:eventId" exact component={EventSingleView} />
        <Route path="/event/:eventId/experience/intro" exact component={ExperienceIntroView} />
        <Route path="/event/:eventId/experience/finish" exact component={ExperienceFinishView} />
        <Route path="/event/:eventId/experience/:spotId" exact component={ExperienceStepView} />
      </Switch>
    </div>
  );
}

export default App;
