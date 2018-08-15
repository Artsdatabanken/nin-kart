import { Button, Divider, ListSubheader } from '@material-ui/core'
import MapsLayers from '@material-ui/icons/Layers'
import React from 'react'
import { withRouter } from 'react-router'
import BakgrunnskartElement from './BakgrunnskartElement'
import PolygonlagElement from './PolygonlagElement'
import TerrenglagElement from './TerrenglagElement'

class AktiveKartlag extends React.Component {
  render() {
    const { koder, history } = this.props

    return (
      <div style={{ position: 'relative', top: 8 }}>
        <ListSubheader>Mine kartlag</ListSubheader>
        <Divider />
        {koder.map(forelder => {
          return listeElement(forelder, this.props)
        })}
        <Button
          icon={<MapsLayers />}
          color="primary"
          style={{ margin: 16, float: 'right' }}
          onClick={() => {
            history.push('/katalog/')
          }}
        >
          Katalog
        </Button>
      </div>
    )
  }
}

function listeElement(forelder, props) {
  const kode = forelder.kode
  const { history, onRemoveSelectedLayer, onMouseEnter, onMouseLeave } = props
  switch (kode) {
    case 'terreng':
      return (
        <TerrenglagElement
          key="terreng"
          meta={{ tittel: { nb: '3D terreng' } }}
          erSynlig={true}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          onClick={() => history.push('/lag/' + kode)}
        />
      )
    case 'bakgrunnskart':
      return (
        <BakgrunnskartElement
          key="basemap"
          tema="Mørk grå"
          meta={{ tittel: { nb: 'Bakgrunnskart' } }}
          erSynlig={true}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          onClick={() => history.push('/lag/' + kode)}
        />
      )
    default:
      return (
        <PolygonlagElement
          {...forelder}
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
