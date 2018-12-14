import { List } from '@material-ui/core'
import React from 'react'
import { withRouter } from 'react-router'
import { SettingsContext } from '../SettingsContext'
import BakgrunnskartElement from './BakgrunnskartElement'
import PolygonlagElement from './PolygonlagElement'
import TerrenglagElement from './TerrenglagElement'
import AktiveKartlagKnapp from './AktiveKartlagKnapp'
import Collapse from '@material-ui/core/Collapse'

class AktiveKartlag extends React.Component {
  render() {
    const { koder, erÅpen } = this.props
    const keys = Object.keys(koder)
    return (
      <SettingsContext.Consumer>
        {context => (
          <Collapse in={erÅpen} collapsedHeight="42px">
            <AktiveKartlagKnapp
              erÅpen={erÅpen}
              antallLag={keys.length - 2}
              onClick={context.onToggleAktiveLag}
            />
            <List
              style={{
                pointerEvents: 'auto',
                backgroundColor: 'white',
                boxShadow:
                  '0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12)',
              }}
            >
              {keys.map(fkode => {
                const forelder = koder[fkode]
                return listeElement(forelder, this.props, context.visKoder)
              })}
            </List>
          </Collapse>
        )}
      </SettingsContext.Consumer>
    )
  }
}

function finnType(kode) {
  switch (kode) {
    case 'terreng':
      return TerrenglagElement
    case 'bakgrunnskart':
      return BakgrunnskartElement
    default:
      return PolygonlagElement
  }
}

function listeElement(forelder, props, visKoder) {
  const kode = forelder.kode
  const {
    history,
    onRemoveSelectedLayer,
    onMouseEnter,
    onMouseLeave,
    onUpdateLayerProp,
  } = props
  const Type = finnType(kode)

  return (
    <Type
      key={kode}
      visKoder={visKoder}
      onClick={() => {
        onMouseLeave()
        history.push('/lag/' + kode)
      }}
      onUpdateLayerProp={onUpdateLayerProp}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onRemove={kode => onRemoveSelectedLayer(kode)}
      {...forelder}
    />
  )
}

export default withRouter(AktiveKartlag)
