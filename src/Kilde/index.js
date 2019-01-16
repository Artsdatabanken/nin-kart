import React, { Component } from "react";
import NA from "./NA";
import { List, ListSubheader } from "@material-ui/core";

const Prefiks = ({ prefiks, geom_id }) => {
  switch (prefiks) {
    case "NA":
      return <NA geom_id={geom_id} />;
    default:
      return <div>Ingen informasjon</div>;
  }
};
class Kilde extends Component {
  render() {
    const { prefiks, geom_id } = this.props;
    return (
      <List>
        <ListSubheader>Om datakilder</ListSubheader>
        <Prefiks prefiks={prefiks} geom_id={geom_id} />
      </List>
    );
  }
}

export default Kilde;
