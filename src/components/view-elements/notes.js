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
  title: {
    fontWeight: 'normal'
  }
});

class ViewNotes extends Component {
  constructor(props) {
    super(props);
    // this.state = {};
    this.state = {
      // notes: undefined,
    };
  }

  render() {
    const { remote, ipcRenderer } = window.require('electron');
    const { classes } = this.props;

    // ipcRenderer.

    const storage = window.require("electron-json-storage");
    if (this.state.notes == undefined) {
      storage.get("notes", function (error, data) {
        if (error) throw error;
        console.log(data)
        set_state(data.ids);
      });
    }

    const set_state = (data) => {
      this.setState({ notes: data });
    };

    const get_title = (id) => {
      return localStorage.getItem(`smde_${id}`);
    };

    const delete_note = (index) => {
      storage.get("notes", function (error, data) {
        if (error) throw error;
        let ids = data.ids;
        localStorage.removeItem(ids[index]);
        ids.splice(index, 1);
        storage.set("notes", { ids: ids }, function (error) {
          if (error) throw error;
          window.location.reload();
        });
      });
    };

    return (
      <div className={classes.root}>
        <h1 className={classes.title}>Notes</h1>
        {this.state.notes !== undefined &&
          this.state.notes.map((id, index) => {
            return (
              <Card className={classes.alarm}>
                <CardContent>
                  <Typography variant="h5" component="h2">
                    <Toolbar>
                      <Box display="flex" flexGrow={1}>
                        {get_title(id)}
                      </Box>
                      <IconButton
                        onClick={() => delete_note(index)}
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

export default withStyles(useStyles)(ViewNotes);
