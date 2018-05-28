import { FlatButton, Subheader } from 'material-ui'
import MapsLayers from 'material-ui/svg-icons/maps/layers'
import React from 'react'
import { withRouter } from 'react-router'
import BakgrunnskartElement from './BakgrunnskartElement'
import EtiketterElement from './EtiketterElement'
import PolygonlagElement from './PolygonlagElement'
import TerrenglagElement from './TerrenglagElement'

class AktiveKartlag extends React.Component {
  state = { ekspandertKode: null }
  handleClick = kode => {
    kode = this.state.ekspandertKode === kode ? null : kode
    this.setState({ ekspandertKode: kode })
  }

  render() {
    const {
      title,
      koder,
      onRemoveSelectedLayer,
      onMouseEnter,
      onMouseLeave,
      onToggleVisible,
      onUpdateLayerProp,
      language,
      history,
    } = this.props
    return (
      <React.Fragment>
        <Subheader>
          {title}
          <FlatButton
            style={{ margin: 8, float: 'right' }}
            label="Katalog"
            labelPosition="before"
            primary={true}
            icon={<MapsLayers />}
            onClick={() => history.replace('/katalog/')}
          />
        </Subheader>

        <EtiketterElement
          key="etiketter"
          kode="Stedsnavn, verneområder"
          meta={{ tittel: { nb: 'Etiketter' } }}
          erEkspandert={'etiketter' === this.state.ekspandertKode}
          skjul={false}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          onRemove={kode => onRemoveSelectedLayer('etiketter')}
          onUpdateLayerProp={onUpdateLayerProp}
          onClick={() => this.handleClick('etiketter')}
          onToggleVisible={kode => onToggleVisible(kode)}
          language={language}
        />
        {koder.map(item => {
          const kode = item.kode
          return (
            <PolygonlagElement
              {...item}
              key={kode}
              kode={kode}
              erEkspandert={kode === this.state.ekspandertKode}
              skjul={item.skjul}
              onMouseEnter={onMouseEnter}
              onMouseLeave={onMouseLeave}
              onRemove={kode => onRemoveSelectedLayer(kode)}
              onUpdateLayerProp={onUpdateLayerProp}
              onClick={() => this.handleClick(kode)}
              onToggleVisible={kode => onToggleVisible(kode)}
              language={language}
            />
          )
        })}
        <BakgrunnskartElement
          key="basemap"
          kode="Mørk grå"
          meta={{ tittel: { nb: 'Bakgrunnskart' } }}
          erEkspandert={'basemap' === this.state.ekspandertKode}
          skjul={false}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          onRemove={kode => onRemoveSelectedLayer('basemap')}
          onUpdateLayerProp={onUpdateLayerProp}
          onClick={() => this.handleClick('basemap')}
          onToggleVisible={kode => onToggleVisible(kode)}
          language={language}
        />
        <TerrenglagElement
          key="terreng"
          kode="2.5x overdrevet"
          meta={{ tittel: { nb: '3D terreng' } }}
          erEkspandert={'terreng' === this.state.ekspandertKode}
          skjul={false}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          onRemove={kode => onRemoveSelectedLayer('terreng')}
          onUpdateLayerProp={onUpdateLayerProp}
          onClick={() => this.handleClick('terreng')}
          onToggleVisible={kode => onToggleVisible(kode)}
          language={language}
        />
      </React.Fragment>
    )
  }
}
export default withRouter(AktiveKartlag)
