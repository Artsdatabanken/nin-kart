import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import React from 'react'

const Illustrasjon = ({ bilde, beskrivelse }) => (
  <React.Fragment>
    <CardMedia>
      <img src={bilde} alt="illustrasjon" style={{ objectFit: 'cover' }} />
    </CardMedia>
    <Typography>{beskrivelse}</Typography>
  </React.Fragment>
)

export default Illustrasjon
