import { RaisedButton, Subheader } from 'material-ui'
import MapsLayers from 'material-ui/svg-icons/maps/layers'
import React from 'react'
import { withRouter } from 'react-router'
import BakgrunnskartElement from './BakgrunnskartElement'
import EtiketterElement from './EtiketterElement'
import PolygonlagElement from './PolygonlagElement'
import TerrenglagElement from './TerrenglagElement'
class AktiveKartlag extends React.Component {
  handleClick = kode => {
    this.props.history.push(`/lag/${kode}`)
  }

  render() {
    const {
      koder,
      onRemoveSelectedLayer,
      onMouseEnter,
      onMouseLeave,
      onToggleVisible,
      language,
      history,
    } = this.props

    koder.map(forelder => {
      forelder.barnArray = []
      if (forelder.barn) {
        Object.keys(forelder.barn).forEach(kode => {
          const item = forelder.barn[kode]
          item.kode = kode
          forelder.barnArray.push(item)
        })
      }
      return null
    })

    return (
      <div style={{ position: 'relative', top: 8 }}>
        <Subheader>Mine kartlag</Subheader>
        <EtiketterElement
          key="etiketter"
          kode="Stedsnavn, verneområder"
          meta={{ tittel: { nb: 'Etiketter' } }}
          vis={true}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          onRemove={kode => onRemoveSelectedLayer('etiketter')}
          onClick={() => this.handleClick('etiketter')}
          onToggleVisible={kode => onToggleVisible(kode)}
          language={language}
        />
        {koder.map(forelder => {
          const kode = forelder.kode
          return (
            <React.Fragment key={kode}>
              <PolygonlagElement
                {...forelder}
                key={'valgt' + kode}
                kode={kode}
                vis={forelder.vis}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
                onRemove={kode => onRemoveSelectedLayer(kode)}
                onClick={() => this.handleClick(kode)}
                onToggleVisible={onToggleVisible}
                language={language}
              />
              {forelder.barnArray.map(item => {
                const kode = item.kode
                return (
                  <PolygonlagElement
                    {...item}
                    key={'valgt' + kode}
                    kode={kode}
                    vis={item.vis}
                    onMouseEnter={onMouseEnter}
                    onMouseLeave={onMouseLeave}
                    onRemove={kode => onRemoveSelectedLayer(kode)}
                    onClick={() => this.handleClick(kode)}
                    onToggleVisible={onToggleVisible}
                    language={language}
                  />
                )
              })}
            </React.Fragment>
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
          onToggleVisible={kode => onToggleVisible(kode)}
          language={language}
        />
        <TerrenglagElement
          key="terreng"
          kode="2.5x overdrevet"
          meta={{ tittel: { nb: '3D terreng' } }}
          vis={true}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          onRemove={kode => onRemoveSelectedLayer('terreng')}
          onClick={() => this.handleClick('terreng')}
          onToggleVisible={kode => onToggleVisible(kode)}
          language={language}
        />
        <RaisedButton
          icon={<MapsLayers />}
          label="Katalog"
          primary
          style={{ margin: 16, float: 'right' }}
          onClick={() => {
            history.push('/katalog/')
            this.props.visKatalog()
          }}
        />
      </div>
    )
  }
}
export default withRouter(AktiveKartlag)
