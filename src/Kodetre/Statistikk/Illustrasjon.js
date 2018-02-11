import React from 'react'
import { CardMedia, CardText } from 'material-ui/Card'

const Illustrasjon = ({ bilde, beskrivelse }) => (
  <React.Fragment>
    <CardMedia>
      <img src={bilde} alt="illustrasjon" style={{ objectFit: 'cover' }} />
    </CardMedia>
    <CardText>{beskrivelse}</CardText>
  </React.Fragment>
)

export default Illustrasjon
