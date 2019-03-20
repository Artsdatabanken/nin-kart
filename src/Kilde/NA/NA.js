import { List, ListItem, ListItemText, ListSubheader } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { Component, default as React } from "react";

const styles = {
  li: {
    fontSize: 13,
    color: "rgba(0,0,0,0.87)"
  }
};

class NA extends Component {
  render() {
    const { classes, description, codes, onClick, ...om } = this.props;
    return (
      <>
        <List>
          <ListSubheader>Natursystem</ListSubheader>
          {description && (
            <ListItem>
              <ListItemText
                classes={{ primary: classes.li }}
                primary={description}
              />
            </ListItem>
          )}
          <Om {...om} />
        </List>
      </>
    );
  }
}

const Kartlegger = props => (
  <>
    <ListItem>
      <ListItemText primary={props.company} secondary="Kartlegger" />
    </ListItem>
  </>
);

const Eier = props => (
  <>
    <ListItem>
      <ListItemText primary={props.company} secondary="Dataeier" />
    </ListItem>
  </>
);

const Prosjekt = ({ prosjekt, program, målestokk }) => (
  <>
    <ListItem>
      <ListItemText primary={målestokk} secondary="Kartlagt i målestokk" />
    </ListItem>
    <ListItem>
      <ListItemText
        primary={prosjekt.name + ", " + prosjekt.description}
        secondary="Prosjekt"
      />
    </ListItem>
    <ListItem>
      <ListItemText
        primary={program.name + ", " + program.description}
        secondary="Program"
      />
    </ListItem>
  </>
);

const Om = props => (
  <>
    {props.surveyer && <Kartlegger {...props.surveyer} />}
    {props.owner && <Eier {...props.owner} />}{" "}
    {props.project && (
      <Prosjekt
        prosjekt={props.project}
        program={props.program}
        målestokk={props.surveyScale}
      />
    )}
    <ListItem>
      <ListItemText primary="lokalId" secondary={props.geom_id} />
    </ListItem>
  </>
);

export default withStyles(styles)(NA);
