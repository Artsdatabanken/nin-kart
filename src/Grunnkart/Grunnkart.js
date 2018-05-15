// @flow
import { FloatingActionButton } from 'material-ui';
import KatalogIkon from 'material-ui/svg-icons/communication/import-contacts';
import React from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import backend from '../backend';
import Kart from '../Kart';
import VenstreVinduContainer from '../VenstreVinduContainer';
import MainDrawer from './MainDrawer';

type State = {
  language: Array<string>,
  baseMapStyle: string,
  mapStyle: string,
  showMainDrawer: boolean,
  visValgte: boolean,
  pointProperties: Object,
  meta: Object,
  localId: string,
  mapBounds: Object,
  bbox: Object,
  opplystKode: string,
}

type Props = {
  location: Object,
  history: Object,
}

class Grunnkart extends React.Component<Props, State> {
  constructor(props) {
    super(props)
    this.state = {
      language: ['nb', 'la'],
      baseMapStyle: 'aNiceDefault',
      mapStyle: '',
      showMainDrawer: false,
      visValgte: true,
      pointProperties: {},
      meta: {},
      localId: '',
      mapBounds: {},
      opplystKode: '',
      bbox: {},
      ekspandertKode: null,
    }
  }

  handleChangeBaseMap = type => {
    console.log(type)
    this.setState({
      baseMapStyle: type,
    })
  }

  handleMapBoundsChange = bounds => {
    console.log(bounds)
    this.setState({ mapBounds: bounds })
  }
  handleFitBounds = bbox => this.setState({ bbox: bbox })

  visValgte = () => {
    this.setState({
      visValgte: true,
    })
  }
  addSelected = props => {
    let koder = this.state.valgteKoder.slice()
    let kodeFinnes = false
    koder.forEach(barn => {
      if (barn.kode === props.kode) {
        kodeFinnes = true // finnes fra før
      }
    })
    if (!kodeFinnes) {
      koder.push(props)
      console.log('addSelected:' + props.kode)
    }
    this.setState({
      valgteKoder: koder,
      visValgte: true,
    })
  }

  setLocalId(localId) {
    if (localId !== this.state.localId) {
      this.setState({ localId: localId })
    }
  }

  componentDidMount() {
    this.handleChangeBaseMap()
    this.fetchMeta(this.props.location.pathname)
  }

  componentWillReceiveProps(nextProps, props) {
    if (nextProps.location.pathname !== this.props.location.pathname)
      this.fetchMeta(nextProps.location.pathname)
  }

  redirectTo(path) {
    const newUrl = '/katalog/' + path
    console.log('router videre til ', newUrl)
    this.props.history.replace(newUrl)
  }

  fetchMeta(url) {
    url = url.toLowerCase()
    let kodematch = url.match(/\/katalog\/(.*)/)
    if (!kodematch || kodematch.length !== 2) {
      this.setState({ meta: '' })
      return
    }

    backend.hentKodeMeta(url).then(data => {
      if (!data) return this.redirectTo('')
      if (data.se) {
        const newUrl = data.se[Object.keys(data.se)[0]].sti
        this.redirectTo(newUrl)
        return
      }
      this.setState({ meta: data })
    })
  }
  handleUpdateLayerProp = (kode, key, value) => {
    let meta = this.state.meta
    let layer = meta.barn[kode] || meta.barn[kode.toUpperCase()]
    layer[key] = value
    this.setState({ meta: meta })
  }
  handleUpdateSelectedLayerProp = (kode, key, value) => {
    let meta = this.state.valgteKoder
    meta.forEach(barn => {
      if (barn.kode === kode) {
        barn[key] = value
      }
    })
    this.setState({ valgteKoder: meta })
  }
  handleRemoveSelectedLayer = kode => {
    let meta = this.state.valgteKoder
    let remove = -1
    Object.keys(meta).forEach(id => {
      if (meta[id].kode === kode) {
        remove = id
      }
    })
    if (remove >= 0) {
      meta.splice(remove, 1)
      this.setState({
        valgteKoder: meta,
        fjernKode: 'valgt' + kode,
      })
    }
  }

  handleShowColorpicker = kode => {
    let nyKode = this.state.ekspandertKode === kode ? null : kode
    this.setState({ ekspandertKode: nyKode })
  }

  render() {
    const aktivKode =
      this.state.meta && this.state.meta.kode ? this.state.meta.kode : ''
    return (
      <div>
        <Kart
          latitude={65.4}
          longitude={10.8}
          zoom={3}
          pitch={0}
          bearing={0}
          aktivKode={aktivKode}
          opplystKode={this.state.opplystKode}
          onMapBoundsChange={this.handleMapBoundsChange}
          meta={this.state.meta}
        />

        <MainDrawer
          handleChangeBaseMap={this.handleChangeBaseMap}
          open={this.state.showMainDrawer}
          onToggleMainDrawer={() =>
            this.setState({ showMainDrawer: !this.state.showMainDrawer })
          }
        />

        {!this.state.showMainDrawer &&
          !this.state.visValgte && (
            <div
              style={{
                backgroundColor: '#fff',
                position: 'absolute',
                left: 8,
                top: 10,
                width: 392,
                zIndex: 2,
              }}
            >
              <VenstreVinduContainer
                onToggleMainDrawer={() =>
                  this.setState({
                    showMainDrawer: !this.state.showMainDrawer,
                  })
                }
                mapBounds={this.state.mapBounds}
                onMouseEnter={kode => this.setState({ opplystKode: kode })}
                onMouseLeave={kode =>
                  this.setState({
                    opplystKode: '',
                  })
                }
                onFitBounds={bbox => this.handleFitBounds(bbox)}
                onAddSelected={props => this.addSelected(props)}
                onExitToRoot={props => this.visValgte()}
                localId={this.state.localId}
                meta={this.state.meta}
                handleUpdateLayerProp={this.handleUpdateLayerProp}
                onShowColorpicker={this.handleShowColorpicker}
                ekspandertKode={this.state.ekspandertKode}
                visValgte={this.state.visValgte}
              />
            </div>
          )}
        {this.state.visValgte && (
          <div>
            <div
              style={{
                position: 'absolute',
                right: 8,
                top: 10,
                width: 392,
                zIndex: 2,
              }}
            >
              <div
                style={{
                  backgroundColor: '#fff',
                }}
              >
                {this.state.valgteKoder.length > 0 && (
                  <AktiveKartlag
                    style={{
                      backgroundColor: '#fff',
                    }}
                    title={`Valgte koder (${this.state.valgteKoder.length})`}
                    koder={this.state.valgteKoder}
                    onGoToCode={kode => {
                      this.setState({
                        visValgte: false,
                      })
                      this.redirectTo(kode)
                    }}
                    onMouseEnter={kode => this.setState({ opplystKode: kode })}
                    onMouseLeave={() =>
                      this.setState({
                        opplystKode: '',
                      })
                    }
                    onShowColorpicker={this.handleShowColorpicker}
                    onUpdateLayerProp={this.handleUpdateSelectedLayerProp}
                    onRemoveSelectedLayer={this.handleRemoveSelectedLayer}
                    ekspandertKode={this.state.ekspandertKode}
                  />
                )}
              </div>
              <div style={{ float: 'right', paddingTop: 10 }}>
                <Link
                  to={`/katalog/`}
                  onClick={e =>
                    this.setState({
                      visValgte: false,
                    })
                  }
                >
                  <FloatingActionButton
                  //style={{ position: 'absolute', bottom: 48, left: 48 }}
                  >
                    <KatalogIkon />
                  </FloatingActionButton>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default withRouter(Grunnkart)
