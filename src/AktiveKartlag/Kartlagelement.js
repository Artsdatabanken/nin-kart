import {
  Avatar,
  Divider,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
} from '@material-ui/core'
import { withTheme } from '@material-ui/core/styles'
import Switch from '@material-ui/core/Switch'
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
          onClick={() => onClick(kode)}
          key={kode}
          onMouseEnter={() => onMouseEnter(kode)}
          onMouseLeave={() => {
            onMouseLeave(kode)
          }}
        >
          <Switch
            checked={this.props.erSynlig}
            onClick={e => {
              this.props.onUpdateLayerProp(
                kode,
                'erSynlig',
                !this.props.erSynlig
              )
              e.stopPropagation()
            }}
          />
          <ListItemText primary={tittel} secondary={undertittel} />
          <ListItemSecondaryAction>
            <Avatar style={{ right: 20 }}>
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
