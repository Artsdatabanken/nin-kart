//@flow
import { CardActions, Switch } from '@material-ui/core'
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

const Tittelblokk = ({
  onGoToCode,
  onToggleLayer,
  isActiveLayer,
  tittel,
  overordnet,
  kode,
}: Props) => (
  <div>
    <Typography gutterBottom variant="headline" component="h2">
      {tittel}
      <KodeTagg hele={false} kode={kode.toUpperCase()} />
    </Typography>
    {overordnet && (
      <Typography gutterBottom component="p">
        {overordnet.map(forelder => (
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
        ))}
      </Typography>
    )}

    <CardActions>
      {overordnet && (
        <Switch
          onToggle={onToggleLayer}
          checked={isActiveLayer}
          label="Kartlag aktivt"
          labelPosition="left"
        />
      )}
    </CardActions>
  </div>
)

export default Tittelblokk
