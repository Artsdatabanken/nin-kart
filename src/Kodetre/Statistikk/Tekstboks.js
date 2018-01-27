import React from 'react'
import { Card, CardTitle, CardText } from 'material-ui/Card'
import InfoIconButton from './InfoIconButton'

const Tekstboks = ({ tittel, beskrivelse, infoUrl }) => (
  <React.Fragment>
    <CardTitle>{tittel}</CardTitle>
    <CardText>
      <InfoIconButton href={infoUrl} />
      {beskrivelse}
    </CardText>
  </React.Fragment>
)

export default Tekstboks
