import {
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  Switch,
} from '@material-ui/core'
import { withTheme } from '@material-ui/core/styles'
import { Component, default as React } from 'react'
import { withRouter } from 'react-router'
import { Route, Switch as RouteSwitch } from 'react-router-dom'
import tinycolor from 'tinycolor2'
import ColorPicker from '../ColorPicker'
import Bakgrunnskartlag from './Bakgrunnskartlag'
import Tema from './Tema'

class Bakgrunnskart extends Component {
  render() {
    const { onUpdateLayerProp } = this.props
    return (
      <React.Fragment>
        <RouteSwitch>
          <Route
            path="/lag/:kode/tema"
            render={({ match, history }) => (
              <Tema onUpdateLayerProp={onUpdateLayerProp} />
            )}
          />
          <Route
            path="/lag/:kode/:lag"
            render={({ match, history }) => {
              const { kode, lag } = match.params
              return (
                <List>
                  <ListSubheader style={{ textTransform: 'capitalize' }}>
                    {kode}
                  </ListSubheader>
                  <ColorPicker
                    tittel={'Fyllfarge'}
                    color={this.props[lag + '_farge']}
                    onChange={farge => {
                      const rgbString = tinycolor(farge.rgb).toRgbString()
                      onUpdateLayerProp(kode, lag + '_farge', rgbString)
                    }}
                  />
                </List>
              )
            }}
          />
          <Route
            path="/lag/:kode"
            render={({ match, history }) => (
              <List>
                <ListSubheader>Områder</ListSubheader>
                <ListItem
                  button={true}
                  onClick={() =>
                    this.props.history.push('/lag/bakgrunnskart/tema')
                  }
                >
                  <ListItemText primary="Tema" secondary={this.props.tema} />
                </ListItem>
                <ListSubheader>Områder</ListSubheader>
                <Bakgrunnskartlag
                  onUpdateLayerProp={this.props.onUpdateLayerProp}
                  lagNavn="vann"
                  tittel="Vann"
                  erSynlig={this.props.vann}
                  farge={this.props.vann_farge}
                />
                <Bakgrunnskartlag
                  onUpdateLayerProp={onUpdateLayerProp}
                  lagNavn="land"
                  tittel="Land"
                  erSynlig={this.props.land}
                  farge={this.props.land_farge}
                />
                <Bakgrunnskartlag
                  onUpdateLayerProp={onUpdateLayerProp}
                  lagNavn="transport"
                  tittel="Transport"
                  erSynlig={this.props.transport}
                  farge={this.props.transport_farge}
                />
                <ListSubheader>Etiketter</ListSubheader>
                <Bakgrunnskartlag
                  onUpdateLayerProp={onUpdateLayerProp}
                  lagNavn="vann_navn"
                  tittel="Vann"
                  erSynlig={this.props.vann_navn}
                  farge={this.props.vann_navn_farge}
                />
                <Bakgrunnskartlag
                  onUpdateLayerProp={onUpdateLayerProp}
                  lagNavn="sted_navn"
                  tittel="Steder"
                  erSynlig={this.props.sted_navn}
                  farge={this.props.sted_navn_farge}
                />
                <Bakgrunnskartlag
                  onUpdateLayerProp={onUpdateLayerProp}
                  lagNavn="transport_navn"
                  tittel="Transport"
                  erSynlig={this.props.transport_navn}
                  farge={this.props.transport_navn_farge}
                />
                <ListSubheader>Administrative grenser</ListSubheader>
                <ListItem>
                  <Switch
                    onChange={() =>
                      onUpdateLayerProp(
                        'bakgrunnskart',
                        'landegrense',
                        !this.props.landegrense
                      )
                    }
                    checked={this.props.landegrense}
                  />
                  <ListItemText primary="Riksgrense" />
                </ListItem>
                <ListItem>
                  <Switch
                    onChange={() =>
                      onUpdateLayerProp(
                        'bakgrunnskart',
                        'fylkesgrense',
                        !this.props.fylkesgrense
                      )
                    }
                    checked={this.props.fylkesgrense}
                  />
                  <ListItemText primary="Fylke" />
                </ListItem>
                <ListItem>
                  <Switch
                    onChange={() =>
                      onUpdateLayerProp(
                        'bakgrunnskart',
                        'kommunegrense',
                        !this.props.kommunegrense
                      )
                    }
                    checked={this.props.kommunegrense}
                  />
                  <ListItemText primary="Kommuner" />
                </ListItem>
              </List>
            )}
          />
        </RouteSwitch>
      </React.Fragment>
    )
  }
}

export default withRouter(withTheme()(Bakgrunnskart))
