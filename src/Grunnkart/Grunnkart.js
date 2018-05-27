// @flow
import React from 'react'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'
import backend from '../backend'
import Kart from '../Kart'
import VenstreVinduContainer from '../VenstreVinduContainer'
import MainDrawer from './MainDrawer'

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
      visValgte: false,
      pointProperties: {},
      meta: {},
      localId: '',
      mapBounds: {},
      opplystKode: '',
      bbox: {},
      ekspandertKode: null,
    }
    this.redirectTo(props.location.pathname.replace('/katalog/', ''))
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

  handleToggleLayer = (kode, state) => {
    const koder = state
      ? [...this.state.valgteKoder, this.state.meta]
      : this.state.valgteKoder.filter(barn => barn.kode !== kode)
    this.setState({
      valgteKoder: koder,
      visValgte: true,
    })
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
    console.error(kode, key, value)
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

  handleToggleVisible = kode => {
    let meta = this.state.valgteKoder
    Object.keys(meta).forEach(id => {
      if (meta[id].kode === kode) {
        meta[id].skjul = !meta[id].skjul
      }
    })
    this.setState({
      valgteKoder: meta,
      skjul: !this.state.skjul,
    })
  }

  render() {
    const erAktivert = this.state.valgteKoder.includes(this.state.meta)
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

        {!this.state.showMainDrawer && (
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
              isActiveLayer={erAktivert}
              onToggleLayer={this.handleToggleLayer}
              onExitToRoot={props => this.visValgte()}
              localId={this.state.localId}
              meta={this.state.meta}
              visValgte={this.state.visValgte}
            />
          </div>
        )}
        {true && (
          <div>
            <div
              style={{
                position: 'absolute',
                right: 0,
                top: 0,
                width: 392,
                zIndex: 2,
              }}
            >
              <div style={{ backgroundColor: '#fff' }}>
                {
                  <AktiveKartlag
                    style={{ backgroundColor: '#fff' }}
                    title="Aktiverte lag"
                    koder={this.state.valgteKoder}
                    onGoToCode={kode => {
                      this.setState({ visValgte: false })
                      this.redirectTo(kode)
                    }}
                    onMouseEnter={kode =>
                      this.setState({
                        opplystKode: kode,
                      })
                    }
                    onMouseLeave={() =>
                      this.setState({
                        opplystKode: '',
                      })
                    }
                    onShowColorpicker={this.handleShowColorpicker}
                    onToggleVisible={this.handleToggleVisible}
                    onUpdateLayerProp={this.handleUpdateSelectedLayerProp}
                    onRemoveSelectedLayer={this.handleRemoveSelectedLayer}
                    ekspandertKode={this.state.ekspandertKode}
                  />
                }
              </div>
              <div style={{ float: 'left', paddingTop: 10 }}>
                <Link
                  to={`/katalog/`}
                  onClick={e =>
                    this.setState({
                      opplystKode: '',
                      meta: {},
                      visValgte: false,
                    })
                  }
                />
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default withRouter(Grunnkart)
