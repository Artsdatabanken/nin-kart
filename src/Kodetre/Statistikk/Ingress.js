import React from 'react'
import { CardText } from 'material-ui/Card'
import InfoIconButton from './InfoIconButton'

const Ingress = ({ infoUrl, beskrivelse }) => (
  <React.Fragment>
    {infoUrl && <InfoIconButton href={infoUrl} />}
    <CardText>{beskrivelse}</CardText>
  </React.Fragment>
)

export default Ingress
