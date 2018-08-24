import {
  List,
  ListItem,
  ListItemSecondaryAction,
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
    return (
      <React.Fragment>
        <RouteSwitch>
          <Route
            path="/lag/:kode/tema"
            render={({ match, history }) => <Tema />}
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
                    color={this.props[lag + 'farge']}
                    onChange={farge => {
                      const rgbString = tinycolor(farge.rgb).toRgbString()
                      this.props.onUpdateLayerProp(
                        kode,
                        lag + 'farge',
                        rgbString
                      )
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
                <ListSubheader>Bakgrunnskart</ListSubheader>
                <ListItem
                  button={true}
                  onClick={() =>
                    this.props.history.push('/lag/bakgrunnskart/tema')
                  }
                >
                  <ListItemText primary="Tema" secondary="Tilpasset" />
                </ListItem>
                <ListSubheader>Utseende</ListSubheader>
                <Bakgrunnskartlag
                  onUpdateLayerProp={this.props.onUpdateLayerProp}
                  lagNavn="vann"
                  tittel="Vann"
                  erSynlig={this.props.vann}
                  farge={this.props.vannfarge}
                />
                <Bakgrunnskartlag
                  onUpdateLayerProp={this.props.onUpdateLayerProp}
                  lagNavn="land"
                  tittel="Land"
                  erSynlig={this.props.land}
                  farge={this.props.landfarge}
                />
                <Bakgrunnskartlag
                  onUpdateLayerProp={this.props.onUpdateLayerProp}
                  lagNavn="transport"
                  tittel="Transport"
                  erSynlig={this.props.transport}
                  farge={this.props.transportfarge}
                />
                <ListSubheader>Administrative grenser</ListSubheader>
                <ListItem>
                  <ListItemText primary="Land" />
                  <ListItemSecondaryAction>
                    <Switch
                      onChange={() =>
                        this.props.onUpdateLayerProp(
                          'bakgrunnskart',
                          'landegrense',
                          !this.props.landegrense
                        )
                      }
                      checked={this.props.landegrense}
                    />
                  </ListItemSecondaryAction>
                </ListItem>
                <ListItem>
                  <ListItemText primary="Fylke" />
                  <ListItemSecondaryAction>
                    <Switch
                      onChange={() =>
                        this.props.onUpdateLayerProp(
                          'bakgrunnskart',
                          'fylkesgrense',
                          !this.props.fylkesgrense
                        )
                      }
                      checked={this.props.fylkesgrense}
                    />
                  </ListItemSecondaryAction>
                </ListItem>
                <ListItem>
                  <ListItemText primary="Kommune" />
                  <ListItemSecondaryAction>
                    <Switch
                      onChange={() =>
                        this.props.onUpdateLayerProp(
                          'bakgrunnskart',
                          'kommunegrense',
                          !this.props.kommunegrense
                        )
                      }
                      checked={this.props.kommunegrense}
                    />
                  </ListItemSecondaryAction>
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
