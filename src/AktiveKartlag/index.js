import { Button, List, ListSubheader } from '@material-ui/core'
import MapsLayers from '@material-ui/icons/Layers'
import React from 'react'
import { withRouter } from 'react-router'
import BakgrunnskartElement from './BakgrunnskartElement'
import PolygonlagElement from './PolygonlagElement'
import TerrenglagElement from './TerrenglagElement'

class AktiveKartlag extends React.Component {
  render() {
    const { koder, history, style } = this.props

    return (
      <div style={{ ...style }}>
        <List>
          <ListSubheader>Mine kartlag</ListSubheader>
          {koder.map(forelder => {
            return listeElement(forelder, this.props)
          })}
          <Button
            variant="outlined"
            icon={<MapsLayers />}
            color="primary"
            style={{ margin: 24 }}
            onClick={() => {
              history.push('/katalog/')
            }}
          >
            Legg til flere
          </Button>
        </List>
      </div>
    )
  }
}

function listeElement(forelder, props) {
  const kode = forelder.kode
  const {
    history,
    onRemoveSelectedLayer,
    onMouseEnter,
    onMouseLeave,
    onUpdateLayerProp,
  } = props
  const subProps = {
    onRemoveSelectedLayer,
    onMouseEnter,
    onMouseLeave,
    onUpdateLayerProp,
  }
  switch (kode) {
    case 'terreng':
      return (
        <TerrenglagElement
          {...forelder}
          {...subProps}
          key={kode}
          onClick={() => history.push('/lag/' + kode)}
        />
      )
    case 'bakgrunnskart':
      return (
        <BakgrunnskartElement
          {...forelder}
          {...subProps}
          key={kode}
          tema="Mørk grå"
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          onClick={() => history.push('/lag/' + kode)}
        />
      )
    default:
      return (
        <PolygonlagElement
          {...forelder}
          {...subProps}
          key={kode}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          onRemove={kode => onRemoveSelectedLayer(kode)}
          onClick={() => history.push('/lag/' + kode)}
        />
      )
  }
}

export default withRouter(AktiveKartlag)
