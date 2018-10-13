import { List, ListItem, ListItemText, ListSubheader } from '@material-ui/core'
import React, { Component } from 'react'
import { withRouter } from 'react-router'
import thumb_flyfoto from './thumb_flyfoto.jpg'
import thumb_lys from './thumb_lys.jpg'
import thumb_mørk from './thumb_mørk.jpg'

const KartPreview = ({ thumb, tittel, checked, onClick }) => (
  <ListItem button={true} onClick={onClick}>
    <ListItemText
      primary={tittel}
      secondary={<img style={{ xleft: 8 }} src={thumb} alt={tittel} />}
    />
  </ListItem>
)

class Tema extends Component {
  handleClick = tema => {
    this.props.onUpdateLayerProp('bakgrunnskart', 'tema', tema)
    this.props.history.push('.')
  }
  render() {
    return (
      <React.Fragment>
        <ListSubheader>Bakgrunnskart tema</ListSubheader>
        <List>
          <KartPreview
            onClick={() => this.handleClick('mørk')}
            thumb={thumb_mørk}
            tittel="Mørk"
          />
          <KartPreview
            onClick={() => this.handleClick('lys')}
            thumb={thumb_lys}
            tittel="Lys"
          />
          <KartPreview
            onClick={() => this.handleClick('flyfoto')}
            thumb={thumb_flyfoto}
            tittel="Flyfoto"
          />
        </List>
      </React.Fragment>
    )
  }
}

export default withRouter(Tema)
