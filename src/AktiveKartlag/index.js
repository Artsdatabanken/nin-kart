import { List } from '@material-ui/core'
import React from 'react'
import { withRouter } from 'react-router'
import { SettingsContext } from '../SettingsContext'
import BakgrunnskartElement from './BakgrunnskartElement'
import PolygonlagElement from './PolygonlagElement'
import TerrenglagElement from './TerrenglagElement'
import AktiveKartlagKnapp from './AktiveKartlagKnapp'

class AktiveKartlag extends React.Component {
  render() {
    const { koder, erÅpen } = this.props
    return (
      <SettingsContext.Consumer>
        {context => (
          <React.Fragment>
            <AktiveKartlagKnapp
              erÅpen={erÅpen}
              onClick={context.onToggleAktiveLag}
            />
            {erÅpen && (
              <List>
                <React.Fragment>
                  {Object.keys(koder).map(fkode => {
                    const forelder = koder[fkode]
                    return listeElement(forelder, this.props, context.visKoder)
                  })}
                </React.Fragment>
              </List>
            )}
          </React.Fragment>
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
