import {
  Avatar,
  Divider,
  IconButton,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
} from '@material-ui/core'
import { withTheme } from '@material-ui/core/styles'
import Switch from '@material-ui/core/Switch'
import Reorder from '@material-ui/icons/Reorder'
import React from 'react'
import { withRouter } from 'react-router'
import PaintSwatch from '../Kodetre/Kodeliste/PaintSwatch'

class Kartlagelement extends React.Component {
  render() {
    const item = this.props
    const { tittel, undertittel, kode, farge, kanFlyttes = true } = this.props
    return (
      <React.Fragment>
        <ListItem
          key={item.kode}
          onMouseEnter={() =>
            this.props.onMouseEnter && this.props.onMouseEnter(kode)
          }
          onMouseLeave={() => {
            this.props.onMouseLeave && this.props.onMouseLeave(kode)
          }}
        >
          <Avatar>
            {this.props.onToggleVisible && (
              <Switch
                checked={this.props.vis}
                onClick={e => {
                  e.stopPropagation()
                  this.props.onToggleVisible(item.kode)
                }}
              />
            )}
          </Avatar>
          <Avatar>
            <PaintSwatch farge={farge} />
          </Avatar>
          <ListItemText primary={tittel} secondary={undertittel} />
          <ListItemSecondaryAction>
            <IconButton>{this.props.rightIcon}</IconButton>
            {!this.props.rightIcon &&
              kanFlyttes && (
                <Reorder
                  style={{ color: this.props.theme.palette.action.disabled }}
                />
              )}
          </ListItemSecondaryAction>
        </ListItem>
        <Divider />
      </React.Fragment>
    )
  }
}

export default withRouter(withTheme()(Kartlagelement))
