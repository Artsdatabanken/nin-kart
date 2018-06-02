import { List, ListItem } from 'material-ui'
import muiThemeable from 'material-ui/styles/muiThemeable'
import React, { Component } from 'react'
import Overskrift from './Overskrift'
import thumb_mørk from './bakgrunn/thumb_mørk.jpg'
import thumb_lys from './bakgrunn/thumb_lys.jpg'
import thumb_flyfoto from './bakgrunn/thumb_flyfoto.jpg'
import thumb_vintage from './bakgrunn/thumb_vintage.jpg'
import Label from './Label'

const KartPreview = ({ thumb, tittel, checked }) => (
  <ListItem
    innerDivStyle={{ padding: 0, marginBottom: 16, backgroundImage: thumb }}
  >
    <Label style={{ left: 0, paddingBottom: 8 }}>{tittel}</Label>
    <img src={thumb} alt={tittel} />
  </ListItem>
)
class Bakgrunnskart extends Component {
  render() {
    //    const { tema = 'Mørk' } = this.props
    return (
      <React.Fragment>
        <Overskrift>Bakgrunnskart</Overskrift>
        <List>
          <KartPreview thumb={thumb_mørk} tittel="Mørk" />
          <KartPreview thumb={thumb_lys} tittel="Lys" />
          <KartPreview thumb={thumb_flyfoto} tittel="Flyfoto" />
          <KartPreview thumb={thumb_vintage} tittel="Gammelt" />
        </List>
      </React.Fragment>
    )
  }
}

export default muiThemeable()(Bakgrunnskart)
