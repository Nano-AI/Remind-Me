import './App.css';
import Alarm from './components/make-item/alarm';
import Main from './components/main-page/main';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/"><Main /></Route>
        <Route path="/make-alarm" component={Alarm} />
      </Switch>
    </Router>
  );
}

export default App;
