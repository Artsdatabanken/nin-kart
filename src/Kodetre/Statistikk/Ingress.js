import Typography from '@material-ui/core/Typography'
import React from 'react'
import InfoIconButton from './InfoIconButton'

const Ingress = ({ infoUrl, beskrivelse }) => (
  <React.Fragment>
    {infoUrl && <InfoIconButton href={infoUrl} />}

    <Typography>{beskrivelse}</Typography>
  </React.Fragment>
)

export default Ingress
