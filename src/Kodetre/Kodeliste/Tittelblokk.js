//@flow
import { CardActions, CardTitle, Toggle } from 'material-ui'
import React from 'react'
import språk from '../../språk'

type Props = {
  tittel: String,
  onGoToCode: Function,
  onToggleLayer: Function,
  isActiveLayer: Boolean,
  overordnet: Object,
}

const Tittelblokk = ({
  onGoToCode,
  onToggleLayer,
  isActiveLayer,
  tittel,
  overordnet,
}: Props) => (
  <CardTitle
    title={tittel}
    subtitle={
      overordnet &&
      overordnet.map(forelder => (
        <div
          key={forelder.kode}
          onClick={e => {
            e.stopPropagation()
            onGoToCode(forelder.sti)
          }}
        >
          {språk(forelder.tittel)}
        </div>
      ))
    }
    subtitleStyle={{ cursor: 'pointer' }}
  >
    <CardActions>
      {overordnet && (
        <Toggle
          onToggle={onToggleLayer}
          toggled={isActiveLayer}
          label="Kartlag aktivt"
          labelPosition="left"
        />
      )}
    </CardActions>
  </CardTitle>
)

export default Tittelblokk
