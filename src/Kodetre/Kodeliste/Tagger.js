import { Avatar, Chip } from '@material-ui/core'
import React from 'react'
import språk from '../../språk'

type Props = {
  tittel: String,
  onGoToCode: Function,
  onToggleLayer: Function,
  erAktivert: Boolean,
  overordnet: Object,
  kode: String,
  classes: Object,
}

const Tagger = ({ overordnet, onGoToCode }: Props) => {
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
export default Tagger
