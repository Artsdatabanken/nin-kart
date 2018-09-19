import { List, ListItem, ListItemText, ListSubheader } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import { Component, default as React } from 'react'

const styles = {
  li: {
    fontSize: 13,
    color: 'rgba(0,0,0,0.87)',
  },
}

class NA extends Component {
  render() {
    const { classes, description, codes, onClick, ...om } = this.props
    return (
      <React.Fragment>
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
      </React.Fragment>
    )
  }
}

const Kartlegger = props => (
  <React.Fragment>
    <ListItem>
      <ListItemText primary={props.company} secondary="Kartlegger" />
    </ListItem>
  </React.Fragment>
)

const Eier = props => (
  <React.Fragment>
    <ListItem>
      <ListItemText primary={props.company} secondary="Dataeier" />
    </ListItem>
  </React.Fragment>
)

const Prosjekt = ({ prosjekt, program, målestokk }) => (
  <React.Fragment>
    <ListItem>
      <ListItemText primary={målestokk} secondary="Kartlagt i målestokk" />
    </ListItem>
    <ListItem>
      <ListItemText
        primary={prosjekt.name + ', ' + prosjekt.description}
        secondary="Prosjekt"
      />
    </ListItem>
    <ListItem>
      <ListItemText
        primary={program.name + ', ' + program.description}
        secondary="Program"
      />
    </ListItem>
  </React.Fragment>
)

const Om = props => (
  <React.Fragment>
    {props.surveyer && <Kartlegger {...props.surveyer} />}
    {props.owner && <Eier {...props.owner} />}{' '}
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
  </React.Fragment>
)

export default withStyles(styles)(NA)
