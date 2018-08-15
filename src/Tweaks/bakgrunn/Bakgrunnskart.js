import {
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  ListSubheader,
  Switch,
} from '@material-ui/core'
import { withTheme } from '@material-ui/core/styles'
import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { Route, Switch as RouteSwitch } from 'react-router-dom'
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
            path="/lag/:kode"
            render={({ match, history }) => (
              <React.Fragment>
                <ListSubheader>Bakgrunnskart</ListSubheader>
                <List>
                  <ListItem
                    button={true}
                    onClick={() =>
                      this.props.history.push('/lag/bakgrunnskart/tema')
                    }
                  >
                    <ListItemText primary="Tema" secondary="Lyse gråtoner" />
                  </ListItem>
                </List>
                <ListSubheader>Administrative grenser</ListSubheader>
                <List>
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
              </React.Fragment>
            )}
          />
        </RouteSwitch>
      </React.Fragment>
    )
  }
}

export default withRouter(withTheme()(Bakgrunnskart))
