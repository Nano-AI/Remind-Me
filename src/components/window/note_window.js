import { Component } from "react";
import SimpleMDE from "react-simplemde-editor";
import EasyMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { withStyles } from "@material-ui/core/styles";
const { remote, ipcRenderer } = window.require('electron')


const useStyles = (theme) => ({
  text: {
    height: "100%",
    width: "100%",
    overflow: "hidden",
  },
  input: {
    flexGrow: '1',
    marginLeft: theme.spacing(2),
  }
});

class NoteWindow extends Component {
  constructor(props) {
    super(props);
    this.state = { height: props.height, width: props.width, id: `smde_${Date.now()}` };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }
  
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }
  
  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }

  render() {
    // const { options, delay, id, ...rest } = this.props;
    const storage = window.require("electron-json-storage");
    var name = "";
    var value = localStorage.getItem(this.state.id) || this.props.value;
    var id = this.state.id;
    storage.get("notes", (error, data) => {
      if (error) throw error;
      if (Object.keys(data).length === 0 || data === undefined) {
        storage.set("notes", { ids: [] }, (error) => {
          if (error) throw error;
        });
        var ids = [];
      } else {
        var ids = data;
      }
      ids["ids"].push(id);
      storage.set("notes", ids, (error) => {
        if (error) throw error;
      });
    });
    const { classes } = this.props;
    console.log('ID ' + id);
    var easyMDE = new EasyMDE({
      element: document.getElementById('editor'),
      sideBySideFullscreen: false,
    });
    easyMDE.codemirror.on("change", function(){
      remote.getCurrentWindow().getParentWindow().send('text-box-change', undefined);
    });
    return (
      <div>
        <SimpleMDE
          id='editor'
          value={value}
          onChange={this.handleChange}
          className={classes.text}
          options={{
            autosave: {
              enabled: true,
              uniqueId: id,
            },
            sideBySideFullscreen: true,
            autofocus: true,
          }}
          style={{
            maxHeight: this.state.height + 'px',
            maxWidth: this.state.width + 'px',
            minHeight: this.state.height + 'px',
            minWidth: this.state.width + 'px',
          }}
        />
      </div>
    );
  }
}

export default withStyles(useStyles)(NoteWindow);
