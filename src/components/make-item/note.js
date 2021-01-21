import { Component } from "react";
import { withStyles } from "@material-ui/core/styles";

const useStyles = (theme) => ({
  
});

class Note extends Component {
  constructor(props) {
    super(props);
    this.state = {height: props.height};
  }
  componentWillMount(){
    this.setState({height: window.innerHeight + 'px'});
  }
  render() {
    const { ipcRenderer } = window.require('electron')
    ipcRenderer.send('make-new-note');
    return (
      <span></span>
    );
  }
}

export default withStyles(useStyles)(Note);