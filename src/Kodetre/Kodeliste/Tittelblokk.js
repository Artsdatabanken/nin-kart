//@flow
import typesystem from '@artsdatabanken/typesystem'
import { Avatar, Chip, withStyles } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import React from 'react'
import språk from '../../språk'
import KodeTagg from '../Kodetagg'

type Props = {
  tittel: String,
  onGoToCode: Function,
  onToggleLayer: Function,
  isActiveLayer: Boolean,
  overordnet: Object,
}

const styles = {
  pos: {
    marginBottom: 12,
  },
}

const Tittelblokk = ({
  onGoToCode,
  onToggleLayer,
  isActiveLayer,
  tittel,
  overordnet,
  kode,
  classes,
}: Props) => (
  <div style={{ padding: 24 }}>
    <div style={{ position: 'relative', top: -68, float: 'right' }}>
      <Chip
        label={kode.slice(3) + ' ' + tittel}
        clickable={true}
        avatar={<Avatar>{kode.slice(0, 2)}</Avatar>}
      />
    </div>
    <Typography gutterBottom variant="headline" component="h2">
      {tittel}
    </Typography>
    <Typography className={classes.pos} color="textSecondary">
      Feil:
      {typesystem.hentNivaa(kode).slice(0, 1)}
      <br />
      {JSON.stringify(typesystem.hentNivaa(kode))}
      {JSON.stringify(typesystem.splittKode(kode))}
    </Typography>

    {overordnet &&
      overordnet.map(forelder => (
        <Chip
          key={forelder.kode}
          label={forelder.kode.slice(3) + ' ' + språk(forelder.tittel)}
          clickable={true}
          onClick={e => {
            e.stopPropagation()
            onGoToCode(forelder.sti)
          }}
          avatar={<Avatar>{forelder.kode.substring(0, 2)}</Avatar>}
          style={{ margin: 4 }}
        />
      ))}
  </div>
)

export default withStyles(styles)(Tittelblokk)
