import { Component } from 'react';
import Get_Nav from './../navbar/navbar';
import Get_Speed_Dial from './../speed-dial/speed_dial';
import ViewAlarms from './../view-elements/alarms';
import run_alarms from './../notification/alarm_notify';

class Main extends Component {
  render() {
    run_alarms();
    return (
      <div>
        {/* {Get_Nav()} */}
        <Get_Nav />
        <Get_Speed_Dial />
        <ViewAlarms />
        {/* {Get_Speed_Dial()} */}
      </div>
    );
  }
}

export default Main;