import { withStyles } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import React from 'react'
import språk from '../../språk'

type Props = {
  tittel: String,
  onGoToCode: PropTypes.func.isRequired,
  onToggleLayer: Function,
  erAktivert: Boolean,
  overordnet: Object,
  kode: String,
  classes: Object,
}

const styles = {
  typo: { color: '#fff' },
  link: { cursor: 'pointer' },
}

const Tagger = ({ overordnet, onGoToCode, classes }: Props) => {
  if (!overordnet) return null
  const r = overordnet.map(forelder => (
    <React.Fragment key={forelder.kode}>
      {forelder.kode.length > 1 && <span>&nbsp;»&nbsp;</span>}
      <span
        className={classes.link}
        onClick={e => {
          e.stopPropagation()
          onGoToCode(forelder.kode)
        }}
      >
        {språk(forelder.tittel)}
      </span>
    </React.Fragment>
  ))
  return (
    <Typography className={classes.typo} variant="body2">
      {r.reverse()}
    </Typography>
  )
}
/*
const Tagger_ = ({ overordnet, onGoToCode }: Props) => {
  if (!overordnet) return null
  return overordnet.map(forelder => (
    <Chip
      key={forelder.kode}
      label={forelder.kode.slice(3) + ' ' + språk(forelder.tittel)}
      clickable={true}
      onClick={e => {
        e.stopPropagation()
        onGoToCode(forelder.kode)
      }}
      avatar={<Avatar>{forelder.kode.substring(0, 2)}</Avatar>}
      style={{ margin: 4 }}
    />
  ))
}
*/
export default withStyles(styles)(Tagger)
