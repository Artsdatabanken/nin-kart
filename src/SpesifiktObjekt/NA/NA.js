import { List, ListItem, ListItemText, ListSubheader } from '@material-ui/core'
import { Component, default as React } from 'react'
import { withRouter } from 'react-router'

class NA extends Component {
  render() {
    const { codes, onClick, ...om } = this.props
    return (
      <React.Fragment>
        <List>
          <ListSubheader>Naturtyper</ListSubheader>
          {codes &&
            Object.keys(codes).map(kode => {
              const node = codes[kode]
              return (
                <ListItem key={kode} button={true} onClick={this.props.onClick}>
                  <ListItemText
                    primary={
                      node.andel !== 10
                        ? `${node.andel * 10}% ${node.tittel}`
                        : node.tittel
                    }
                    secondary={kode}
                  />
                </ListItem>
              )
            })}
          <ListSubheader>Om kartleggingen</ListSubheader>
          <Om {...om} />
        </List>
      </React.Fragment>
    )
  }
}

const Kartlegger = props => (
  <React.Fragment>
    <ListItem>
      <ListItemText
        primary={props.contactPerson + ', ' + props.company}
        secondary="Kartlegger"
      />
    </ListItem>
  </React.Fragment>
)

const Eier = props => (
  <React.Fragment>
    <ListItem>
      <ListItemText
        primary={props.contactPerson + ', ' + props.company}
        secondary="Dataeier"
      />
    </ListItem>
  </React.Fragment>
)

const Prosjekt = ({ prosjekt, program, målestokk, beskrivelse }) => (
  <React.Fragment>
    {beskrivelse && (
      <ListItem>
        <ListItemText primary={beskrivelse} />
      </ListItem>
    )}
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
        beskrivelse={props.description}
      />
    )}
  </React.Fragment>
)

export default withRouter(NA)
