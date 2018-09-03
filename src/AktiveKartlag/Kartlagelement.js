import {
  Avatar,
  Divider,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
} from '@material-ui/core'
import { withTheme } from '@material-ui/core/styles'
import { Visibility, VisibilityOff } from '@material-ui/icons'
import React from 'react'
import { withRouter } from 'react-router'
import PaintSwatch from '../Kodetre/Kodeliste/PaintSwatch'

class Kartlagelement extends React.Component {
  render() {
    const {
      tittel,
      undertittel,
      kode,
      farge,
      onMouseLeave,
      onMouseEnter,
      onClick,
    } = this.props
    return (
      <React.Fragment>
        <ListItem
          button={true}
          dense={true}
          onClick={() => onClick(kode)}
          key={kode}
          onMouseEnter={() => onMouseEnter(kode)}
          onMouseLeave={() => {
            onMouseLeave(kode)
          }}
        >
          <ListItemAvatar>
            <IconButton
              onClick={e => {
                this.props.onUpdateLayerProp(
                  kode,
                  'erSynlig',
                  !this.props.erSynlig
                )
                e.stopPropagation()
              }}
            >
              {this.props.erSynlig ? (
                <Visibility style={{ color: '#333' }} />
              ) : (
                <VisibilityOff style={{ color: '#aaa' }} />
              )}
            </IconButton>
          </ListItemAvatar>
          <ListItemText primary={tittel} secondary={undertittel} />
          <ListItemSecondaryAction style={{ paddingRight: 8 }}>
            <Avatar>
              {farge ? (
                <PaintSwatch color={farge} />
              ) : (
                <img src={'/' + kode + '.png'} alt="farge" />
              )}
            </Avatar>
          </ListItemSecondaryAction>
        </ListItem>
        <Divider />
      </React.Fragment>
    )
  }
}

export default withRouter(withTheme()(Kartlagelement))
