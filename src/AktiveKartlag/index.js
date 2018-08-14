import { Button, Divider, ListSubheader } from '@material-ui/core'
import MapsLayers from '@material-ui/icons/Layers'
import React from 'react'
import { withRouter } from 'react-router'
import BakgrunnskartElement from './BakgrunnskartElement'
import PolygonlagElement from './PolygonlagElement'
import TerrenglagElement from './TerrenglagElement'

class AktiveKartlag extends React.Component {
  render() {
    const {
      koder,
      onRemoveSelectedLayer,
      onMouseEnter,
      onMouseLeave,
      language,
      history,
    } = this.props

    return (
      <div style={{ position: 'relative', top: 8 }}>
        <ListSubheader>Mine kartlag</ListSubheader>
        <Divider />
        {koder.map(forelder => {
          const kode = forelder.kode
          return (
            <PolygonlagElement
              {...forelder}
              key={kode}
              kode={kode}
              vis={forelder.vis}
              onMouseEnter={onMouseEnter}
              onMouseLeave={onMouseLeave}
              onRemove={kode => onRemoveSelectedLayer(kode)}
              language={language}
            />
          )
        })}
        <BakgrunnskartElement
          key="basemap"
          kode="Mørk grå"
          meta={{ tittel: { nb: 'Bakgrunnskart' } }}
          vis={true}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          onRemove={kode => onRemoveSelectedLayer('basemap')}
          onClick={() => this.handleClick('basemap')}
          language={language}
        />
        <TerrenglagElement
          key="terreng"
          meta={{ tittel: { nb: '3D terreng' } }}
          vis={true}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          onRemove={kode => onRemoveSelectedLayer('terreng')}
          onClick={() => this.handleClick('terreng')}
          language={language}
        />
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
export default withRouter(AktiveKartlag)
