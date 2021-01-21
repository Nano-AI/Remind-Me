import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
} from "@material-ui/pickers";

const electron = window.require("electron");
const ipcRenderer = electron.ipcRenderer;

const useStyles = (theme) => ({
  form: {
    display: "flex",
    flexDirection: "column",
    margin: "auto",
    width: "fit-content",
  },
  formControl: {
    // marginTop: theme.spacing(2),
    minWidth: 120,
  },
  formControlLabel: {
    // marginTop: theme.spacing(1),
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  no_margin_top: {
    marginTop: 0,
  },
});

class Alarm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDate: new Date(),
    };
  }
  render() {
    const { classes } = this.props;

    const handleDateChange = (date) => {
      console.log(date);
      this.setState({ selectedDate: new Date(date) });
    };

    const handleClose = () => {
      window.location.reload();
    };

    const make_alarm = () => {
      const storage = window.require("electron-json-storage");
      let selected_time = this.state.selectedDate;

      storage.get("alarms", function (error, data) {
        if (error) throw error;
        let arr = Object.keys(data).length != 0 ? data.alarms : [];
        console.log(data);
        arr.push(selected_time);
        storage.set("alarms", { alarms: arr }, function (error) {
          if (error) throw error;
          handleClose();
        });
      });
    };

    return (
      <React.Fragment>
        <Dialog
          fullWidth={true}
          maxWidth="lg"
          open={true}
          onClose={handleClose}
          aria-labelledby="max-width-dialog-title"
        >
          <DialogTitle id="max-width-dialog-title">Make Alarm</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Set an alarm to go off at a specific time.
            </DialogContentText>
            <form className={classes.form} noValidate>
              <FormControlLabel
                className={classes.formControlLabel}
                control={
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardTimePicker
                      margin="normal"
                      id="time-picker"
                      label="Alarm time"
                      value={this.state.selectedDate}
                      onChange={handleDateChange}
                      KeyboardButtonProps={{
                        "aria-label": "change time",
                      }}
                    />
                  </MuiPickersUtilsProvider>
                }
              />
            </form>
          </DialogContent>
          <DialogActions>
            <Button color="primary" onClick={make_alarm}>
              Done
            </Button>
            <Button onClick={handleClose} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    );
  }
}

export default withStyles(useStyles)(Alarm);
