import { List, ListItem, ListSubheader } from '@material-ui/core'
import React, { Component } from 'react'
import { withRouter } from 'react-router'
import thumb_flyfoto from './thumb_flyfoto.jpg'
import thumb_lys from './thumb_lys.jpg'
import thumb_mørk from './thumb_mørk.jpg'
import thumb_vintage from './thumb_vintage.jpg'

const KartPreview = ({ thumb, tittel, checked, onClick }) => (
  <ListItem
    button={true}
    innerDivStyxle={{
      padding: 0,
      margin: 0,
      marginBottom: 16,
      backgroundImage: thumb,
    }}
    onClick={onClick}
  >
    <img style={{ position: 'relative', left: -20 }} src={thumb} alt={tittel} />
  </ListItem>
)

class Tema extends Component {
  handleClick = () => {
    this.props.history.push('.')
    //    this.props.onUpdateLayerProp('bakgrunnskart', 'tema', tittel)
  }
  render() {
    return (
      <React.Fragment>
        <ListSubheader>Bakgrunnskart tema</ListSubheader>
        <List>
          <KartPreview
            onClick={this.handleClick}
            thumb={thumb_mørk}
            tittel="Mørk"
          />
          <KartPreview
            onClick={this.handleClick}
            thumb={thumb_lys}
            tittel="Lys"
          />
          <KartPreview
            onClick={this.handleClick}
            thumb={thumb_flyfoto}
            tittel="Flyfoto"
          />
          <KartPreview
            onClick={this.handleClick}
            thumb={thumb_vintage}
            tittel="Gammelt"
          />
        </List>
      </React.Fragment>
    )
  }
}

export default withRouter(Tema)
