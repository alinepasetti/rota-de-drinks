import React from 'react';
import './App.scss';
import { Route, Link, Switch } from 'react-router-dom';
import HomeView from './views/Home';
import EventsListView from './views/EventsList';
import EventSingleView from './views/EventSingle';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/" component={HomeView} />
        <Route path="/events" exact component={EventsListView} />
        <Route path="/event/:eventId" component={EventSingleView} />
      </Switch>
    </div>
  );
}

export default App;
