import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Alarm from "./components/make-item/alarm";
import Main from "./components/main-page/main";
import NoteWindow from "./components/window/note_window";

class ViewManager extends Component {
  Views() {
    return {
      'make-note': <NoteWindow />
    };
  }

  View(props) {
    const isDev = window.require("electron-is-dev");
    if (isDev)
      var location = props.location.search;
    else
      location = props.location.hash;
    console.log(props);
    if (location == undefined || props.search == '/')
      return <Main />
    let name = location.substr(1);
    if (name.includes('=')) {
      // name = name.slice(0, name.indexOf('='));
      name = name.slice(name.indexOf('=') + 1)
    }
    console.log(name)
    let view = this.Views()[name];
    if (view == null || view == undefined) return <Main />;
    return view;
  }

  render() {
    return (
      <Router>
        <div>
          {/* <Route path="/" exact component={() => <Main />} /> */}
          {/* <Route path="/" component={() => this.View()} /> */}
          <Route path="/" render={(routerProps) => this.View(routerProps)} />
          <Route path="/make-alarm" component={() => <Alarm />} />
          {/* <Route path="/make-note" component={() => <NoteWindow />} /> */}
        </div>
      </Router>
    );
  }
}

export default ViewManager;
