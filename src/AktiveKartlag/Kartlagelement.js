import {
  Avatar,
  Divider,
  IconButton,
  ListItem,
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
    const { tittel, undertittel, kode, farge, kanFlyttes = true } = this.props
    return (
      <React.Fragment>
        <ListItem
          key={kode}
          onMouseEnter={() =>
            this.props.onMouseEnter && this.props.onMouseEnter(kode)
          }
          onMouseLeave={() => {
            this.props.onMouseLeave && this.props.onMouseLeave(kode)
          }}
        >
          <Switch
            checked={this.props.vis}
            onClick={e => {
              e.stopPropagation()
            }}
          />
          <ListItemText primary={tittel} secondary={undertittel} />
          <Avatar style={{ float: 'left' }}>
            <PaintSwatch farge={farge} />
          </Avatar>
          {kanFlyttes && (
            <IconButton
              aria-label="Reorder"
              style={{
                cursor: '-webkit-grab',
                color: this.props.theme.palette.action.disabled,
              }}
            >
              <Reorder />
            </IconButton>
          )}
        </ListItem>
        <Divider />
      </React.Fragment>
    )
  }
}

export default withRouter(withTheme()(Kartlagelement))
