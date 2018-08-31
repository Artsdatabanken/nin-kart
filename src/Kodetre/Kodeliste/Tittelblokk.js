//@flow
import { Avatar, Chip, withStyles } from '@material-ui/core'
import { withTheme } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import React from 'react'
import farger from '../../farger'
import Tagger from './Tagger'

type Props = {
  tittel: String,
  onToggleLayer: Function,
  onGoToCode: Function,
  erAktivert: Boolean,
  overordnet: Object,
  kode: String,
  prefiks: String,
  nivå: String,
  classes: Object,
  theme: Object,
}

const styles = {
  block: {
    _backgroundColor: '#4a8',
    padding: '16px 24px 20px',
  },
  h1: {
    color: '#fff',
    marginTop: 0,
    marginBottom: 0,
    xfontSize: 18,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    width: '100%',
  },
  nivå: {
    color: '#fff',
    textTransform: 'capitalize',
  },
}

const Tittelblokk = ({
  onToggleLayer,
  erAktivert,
  tittel,
  kode,
  prefiks,
  nivå,
  overordnet,
  onGoToCode,
  classes,
  theme,
}: Props) => {
  return (
    <div className={classes.block} style={{ backgroundColor: farger[prefiks] }}>
      {false && (
        <div
          style={{ position: 'relative', top: -72, right: -10, float: 'right' }}
        >
          <Chip
            label={kode.slice(3) + ' ' + tittel}
            clickable={true}
            avatar={<Avatar>{kode.slice(0, 2)}</Avatar>}
          />
          <div className={classes.h1}>{tittel}</div>
        </div>
      )}
      <Typography variant="title" className={classes.h1} gutterBottom>
        {tittel}
      </Typography>
      <Typography className={classes.nivå}>{nivå}</Typography>
      <Tagger overordnet={overordnet} onGoToCode={onGoToCode} />
    </div>
  )
}

export default withStyles(styles)(withTheme()(Tittelblokk))
