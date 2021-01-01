import { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import AlarmIcon from "@material-ui/icons/Alarm";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Toolbar from "@material-ui/core/Toolbar";

const useStyles = (theme) => ({
  root: {
    padding: theme.spacing(2),
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  alarm: {
    marginBottom: theme.spacing(1),
  },
});

class ViewAlarms extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alarms: undefined,
    };
  }

  render() {
    const { classes } = this.props;

    const storage = window.require("electron-json-storage");

    storage.get("alarms", function (error, data) {
      if (error) throw error;
      set_state(data);
    });

    const set_state = (data) => {
      if (this.state.alarms != undefined) return;
      this.setState({ alarms: data.alarms });
    };

    const formatDate = (date) => {
      var hours = date.getHours();
      var minutes = date.getMinutes();
      var ampm = hours >= 12 ? "pm" : "am";
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      minutes = minutes < 10 ? "0" + minutes : minutes;
      var strTime = hours + ":" + minutes + " " + ampm;
      return strTime;
    };

    const delete_alarm = (index) => {
      storage.get("alarms", function (error, data) {
        if (error) throw error;
        let alarms = data.alarms;
        alarms.splice(index, 1);
        storage.set("alarms", { alarms: alarms }, function (error) {
          if (error) throw error;
          window.location.reload();
        });
      });
    };

    return (
      <div className={classes.root}>
        {this.state.alarms !== undefined &&
          this.state.alarms.map((value, key) => {
            return (
              <Card className={classes.alarm}>
                <CardContent>
                  <Typography variant="h5" component="h2">
                    <Toolbar>
                      <Box display="flex" flexGrow={1}>
                        {formatDate(new Date(value))}
                      </Box>
                      <IconButton
                        onClick={() => delete_alarm(key)}
                        aria-label="delete"
                      >
                        <DeleteIcon style={{ marginLeft: "auto" }} />
                      </IconButton>
                    </Toolbar>
                  </Typography>
                </CardContent>
              </Card>
            );
          })}
      </div>
    );
  }
}

export default withStyles(useStyles)(ViewAlarms);
