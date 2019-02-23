import { ListSubheader } from "@material-ui/core";
import React, { Component } from "react";

class Overskrift extends Component {
  render() {
    return <ListSubheader>{this.props.children}</ListSubheader>;
  }
}

export default Overskrift;
