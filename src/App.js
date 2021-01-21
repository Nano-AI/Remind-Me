import './App.css';
import Alarm from './components/make-item/alarm';
import Main from './components/main-page/main';
import NoteWindow from './components/window/note_window';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import { Component } from 'react';
import ViewManager from './View';

function App() {
  return (
    <ViewManager />
    // <Router>
    //   <Switch>
    //     {/* <Route path="/" exact component={() => <Main />} /> */}
    //     <Route path="/" component={() => this.View()} />
    //     <Route path="/make-alarm" component={() => <Alarm />} />
    //     {/* <Route path="/make-note" component={() => <NoteWindow />} /> */}
    //   </Switch>
    // </Router>
  );
}

export default App;
