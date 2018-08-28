//@flow
import typesystem from '@artsdatabanken/typesystem'
import { Avatar, Chip, withStyles } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import React from 'react'

type Props = {
  tittel: String,
  onToggleLayer: Function,
  erAktivert: Boolean,
  overordnet: Object,
  kode: String,
  classes: Object,
}

const styles = {
  h1: {
    marginBottom: 0,
  },
  h2: {
    marginBottom: 12,
  },
}

const Tittelblokk = ({
  onToggleLayer,
  erAktivert,
  tittel,
  kode,
  classes,
}: Props) => (
  <div style={{ padding: 24 }}>
    <div style={{ position: 'relative', top: -72, right: -10, float: 'right' }}>
      <Chip
        label={kode.slice(3) + ' ' + tittel}
        clickable={true}
        avatar={<Avatar>{kode.slice(0, 2)}</Avatar>}
      />
    </div>
    <Typography
      className={classes.h1}
      gutterBottom
      variant="headline"
      component="h2"
    >
      {tittel}
    </Typography>
    <Typography className={classes.h2} color="textSecondary">
      {typesystem.hentNivaa(kode).slice(0, 1)}
    </Typography>
  </div>
)

export default withStyles(styles)(Tittelblokk)
