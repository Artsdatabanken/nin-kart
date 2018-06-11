//@flow
import { CardActions, CardTitle, Toggle } from 'material-ui'
import React from 'react'
import KodeTagg from '../Kodetagg'
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
  kode,
}: Props) => (
  <CardTitle
    title={
      <div>
        {tittel}
        <KodeTagg hele={false} kode={kode.toUpperCase()} />
      </div>
    }
    subtitle={
      overordnet &&
      overordnet.map(forelder => (
        <div
          className={'hoverUnderline'}
          key={forelder.kode}
          onClick={e => {
            e.stopPropagation()
            onGoToCode(forelder.sti)
          }}
        >
          {språk(forelder.tittel)}
          <KodeTagg hele={false} kode={forelder.kode.toUpperCase()} />
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
