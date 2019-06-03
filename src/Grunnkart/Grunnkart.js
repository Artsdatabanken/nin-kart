import React from "react";
import { withRouter } from "react-router";
import backend from "Funksjoner/backend";
import { SettingsContext } from "../SettingsContext";
import KatalogFane from "Sidebar/Katalog/KatalogFane";
import bakgrunnskarttema from "./bakgrunnskarttema";
import TopBar from "../TopBar/TopBar";
import Kartlag from "Sidebar/Kartlag/Kartlag";
import Kart from "../Kart/LeafletTangram";
import metaSjekk from "./GrunnkartFunksjoner/metaSjekk";
import fetchMeta from "./GrunnkartFunksjoner/fetchMeta";
import aktiverFraHistorikk from "./GrunnkartFunksjoner/aktiverFraHistorikk";
import aktiverValgtKartlag from "./GrunnkartFunksjoner/aktiverValgtKartlag";
import oppdaterMetaProperties from "./GrunnkartFunksjoner/oppdaterMetaProperties";
import oppdaterLagProperties from "./GrunnkartFunksjoner/oppdaterLagProperties";

class Grunnkart extends React.Component {
  constructor(props) {
    super(props);
    let aktive = {
      bakgrunnskart: JSON.parse(JSON.stringify(bakgrunnskarttema))
    };
    this.state = {
      aktiveLag: aktive,
      opplystKode: "",
      opplyst: {},
      actualBounds: null,
      fitBounds: null,
      meta: null,
      visKoder: false,
      navigation_history: []
    };
    this.props.history.listen((location, action) => {
      // Åpne menyen ved navigering
      this.context.onNavigateToTab("meny");
    });
  }

  handleActualBoundsChange = bounds => {
    this.setState({ actualBounds: bounds, fitBounds: null });
  };
  handleFitBounds = bbox => {
    this.setState({ fitBounds: bbox });
  };
  handleBoundsChange = bbox => {
    this.setState({ actualBounds: bbox });
  };
  handleClearSearchFor = () => this.setState({ searchFor: null });
  handleToggleLayer = () => {
    this.addSelected(this.state.meta);
  };
  componentDidMount() {
    fetchMeta(this.props.location.pathname, this);
  }

  addSelected = props => {
    this.setState({
      aktiveLag: Object.assign(
        {},
        aktiverValgtKartlag(props, this.state.aktiveLag)
      )
    });
  };

  activateLayerFromHistory = node => {
    this.setState({
      aktiveLag: Object.assign({}, aktiverFraHistorikk(node))
    });
  };

  componentDidUpdate(prevProps, prevState) {
    const path = this.props.location.pathname;
    if (path !== prevProps.location.pathname) {
      fetchMeta(path, this);
    }
    document.title =
      (this.state.meta && this.state.meta.tittel.nb) || "Natur i Norge";
  }

  async downloadMeta(url) {
    const meta = await backend.hentKodeMeta(url);
    metaSjekk(meta, this);
    return meta;
  }

  handleRemoveSelectedLayer = kode => {
    let aktive = this.state.aktiveLag;
    delete aktive[kode];
    this.setState({ aktiveLag: aktive });
  };

  handleUpdateLayerProp = (layer, key, value) => {
    this.setState({
      aktiveLag: Object.assign(
        {},
        oppdaterLagProperties(layer, key, value, this)
      )
    });
  };

  handleUpdateMetaProp = (kode, key, value) => {
    this.setState({
      meta: Object.assign({}, oppdaterMetaProperties(kode, key, value, this))
    });
  };

  render() {
    const { history } = this.props;
    let erAktivert = false;
    if (this.state.meta)
      erAktivert = !!this.state.aktiveLag[this.state.meta.kode];

    return (
      <SettingsContext.Consumer>
        {context => {
          return (
            <>
              <TopBar
                onSelectResult={item => {
                  history.push("/" + item.url);
                }}
              />
              <div>
                {context.aktivTab === "meny" && (
                  <div className="sidebar">
                    <KatalogFane
                      aktiveLag={this.state.aktiveLag}
                      mapBounds={this.state.actualBounds}
                      onMouseEnter={this.handleMouseEnter}
                      onMouseLeave={this.handleMouseLeave}
                      onFitBounds={this.handleFitBounds}
                      erAktivert={erAktivert}
                      opplyst={this.state.opplyst}
                      onToggleLayer={() => {
                        this.handleToggleLayer();
                        if (!context.visAktiveLag) context.onToggleAktiveLag();
                      }}
                      meta={this.state.meta}
                      searchFor={this.state.searchFor}
                      onClearSearchFor={this.handleClearSearchFor}
                      onUpdateLayerProp={this.handleUpdateLayerProp}
                      onUpdateMetaProp={this.handleUpdateMetaProp}
                      visAktiveLag={context.visAktiveLag}
                      onToggleAktiveLag={context.onToggleAktiveLag}
                    />
                  </div>
                )}
                <Kartlag
                  hidden={context.aktivTab === "kartlag" && true}
                  aktiveLag={this.state.aktiveLag}
                  onUpdateLayerProp={this.handleUpdateLayerProp}
                  onRemoveSelectedLayer={this.handleRemoveSelectedLayer}
                  navigation_history={this.state.navigation_history}
                  onFitBounds={this.handleFitBounds}
                  history={history}
                  activateLayerFromHistory={this.activateLayerFromHistory}
                />

                <Kart
                  bounds={this.state.fitBounds}
                  latitude={65.4}
                  longitude={10.8}
                  zoom={3}
                  aktiveLag={this.state.aktiveLag}
                  opplyst={this.state.opplyst}
                  opplystKode={this.state.opplystKode}
                  meta={this.state.meta}
                  onMapBoundsChange={this.handleActualBoundsChange}
                  onMapMove={context.onMapMove}
                  onClick={latlng => {
                    history.push(`?lng=${latlng.lng}&lat=${latlng.lat}`);
                  }}
                  onRemoveSelectedLayer={this.handleRemoveSelectedLayer}
                  onMouseEnter={this.handleMouseEnter}
                  onMouseLeave={this.handleMouseLeave}
                />
              </div>
            </>
          );
        }}
      </SettingsContext.Consumer>
    );
  }

  handleMouseEnter = ({ kode, url }) => {
    //console.log("mouseenter", kode, url);
    this.setState({ opplystKode: kode, opplyst: { kode: kode, url: url } });
  };

  handleMouseLeave = () => {
    //console.log("mouseleave");
    this.setState({ opplystKode: "", opplyst: {} });
  };

  static contextType = SettingsContext;
}

export default withRouter(Grunnkart);
