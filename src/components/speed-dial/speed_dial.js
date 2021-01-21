import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import SpeedDial from "@material-ui/lab/SpeedDial";
import SpeedDialIcon from "@material-ui/lab/SpeedDialIcon";
import SpeedDialAction from "@material-ui/lab/SpeedDialAction";
import AlarmIcon from "@material-ui/icons/Alarm";
import NoteIcon from "@material-ui/icons/Note";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import Backdrop from "@material-ui/core/Backdrop";
import { withStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";

import Alarm from "../make-item/alarm";
import Note from "../make-item/note";
import Reminder from "../make-item/reminder";

const electron = window.require("electron");
const ipcRenderer = electron.ipcRenderer;


const useStyles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    marginLeft: theme.spacing(2),
  },
  speedDial: {
    margin: theme.spacing.unit, // You might not need this now
    position: "fixed",
    bottom: theme.spacing.unit * 1,
    right: theme.spacing.unit * 1
  },
});

class Get_Speed_Dial extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      clicked: null,
    };
    this.actions = [
      { icon: <CalendarTodayIcon />, name: "Reminder" },
      { icon: <NoteIcon />, name: "Note" },
      { icon: <AlarmIcon />, name: "Alarm" },
    ];
  }

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Backdrop open={this.open} />
        <SpeedDial
          ariaLabel="SpeedDial tooltip example"
          className={classes.speedDial}
          icon={<SpeedDialIcon />}
          onClose={() => {
            this.setState({ open: false, clicked: this.state.clicked });
          }}
          onOpen={() => {
            this.setState({ open: true, clicked: this.state.clicked });
          }}
          open={this.state.open}
        >
          {this.actions.map((action) => {
            return (
              <SpeedDialAction
                key={action.name}
                icon={action.icon}
                tooltipTitle={action.name}
                tooltipOpen
                onClick={() => {
                  console.log(action.name.toLowerCase());
                  switch (action.name.toLowerCase()) {
                    case "alarm":
                      this.setState({
                        open: this.state.clicked,
                        clicked: <Alarm />,
                      });
                      break;
                    case "note":
                      this.setState({
                        open: this.state.clicked,
                        clicked: <Note />,
                      });
                      break;
                    case "reminder":
                      this.setState({
                        open: this.state.clicked,
                        clicked: <Reminder />,
                      });
                      break;
                    default:
                      this.setState({
                        open: this.state.clicked,
                        clicked: null,
                      });
                  }
                }}
              />
            );
          })}
        </SpeedDial>
        {this.state.clicked}
      </div>
    );
  }
}

export default withStyles(useStyles)(Get_Speed_Dial);
