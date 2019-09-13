import React from "react";
import { withRouter } from "react-router";
import backend from "Funksjoner/backend";
import { SettingsContext } from "SettingsContext";
import InformasjonsVisning from "InformasjonsVisning/InformasjonsVisning";
import TopBar from "TopBar/TopBar";
import Kartlag from "Kartlag/Kartlag";
import Kart from "Kart/LeafletTangram/Leaflet";
import metaSjekk from "AppSettings/AppFunksjoner/metaSjekk";
import fetchMeta from "AppSettings/AppFunksjoner/fetchMeta";
import aktiverFraHistorikk from "AppSettings/AppFunksjoner/aktiverFraHistorikk";
import aktiverValgtKartlag from "AppSettings/AppFunksjoner/aktiverValgtKartlag";
import oppdaterMetaProperties from "AppSettings/AppFunksjoner/oppdaterMetaProperties";
import oppdaterLagProperties from "AppSettings/AppFunksjoner/oppdaterLagProperties";
import bakgrunnskarttema from "AppSettings/bakgrunnskarttema";
import HamburgerMeny from "HamburgerMeny/HamburgerMeny";
import MobileNavigation from "MobileNavigation/MobileNavigation";
import ForsideInformasjon from "Forside/ForsideInformasjon";
import språk from "Funksjoner/språk";
import "style/Kart.css";
import "style/App.css";
import "style/Sidebar.css";
import "style/GeografiskSidebar.css";
import "style/Kartlag.css";
import "style/FargeMenyer.css";
export let exportableSpraak;
export let exportableFullscreen;

class App extends React.Component {
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
      navigation_history: [],
      showCurrent: true,
      showFullscreen: false,
      spraak: "nb"
    };
    exportableSpraak = this;
    exportableFullscreen = this;
    this.props.history.listen(() => {
      // Åpne info ved navigering
      this.context.onNavigateToTab("informasjon");
    });
  }

  render() {
    const { history } = this.props;
    let erAktivert = false;
    if (this.state.meta)
      erAktivert = !!this.state.aktiveLag[this.state.meta.kode];
    const path = this.props.location.pathname;
    let forside = false;
    if (path === "/") {
      forside = true;
    }

    return (
      <SettingsContext.Consumer>
        {context => {
          return (
            <>
              <div
                className={
                  this.state.showFullscreen ? "hidden_in_fullscreen" : ""
                }
              >
                <TopBar
                  forside={forside}
                  searchFor={this.state.searchFor}
                  onSelectResult={item => {
                    history.push("/" + item.url);
                  }}
                  history={history}
                  showFullscreen={this.state.showFullscreen}
                  handleFullscreen={this.handleFullscreen}
                />
              </div>

              {forside ? (
                <ForsideInformasjon />
              ) : (
                <>
                  <div
                    className={
                      this.state.showFullscreen ? "hidden_in_fullscreen" : ""
                    }
                  >
                    <MobileNavigation />
                  </div>
                  <div>
                    {(context.aktivTab === "meny" ||
                      context.aktivTab === "informasjon") && (
                      <InformasjonsVisning
                        aktivTab={context.aktivTab}
                        show_current={this.state.showCurrent}
                        handleShowCurrent={this.handleShowCurrent}
                        aktiveLag={this.state.aktiveLag}
                        mapBounds={this.state.actualBounds}
                        onMouseEnter={this.handleMouseEnter}
                        onMouseLeave={this.handleMouseLeave}
                        onFitBounds={this.handleFitBounds}
                        erAktivert={erAktivert}
                        opplyst={this.state.opplyst}
                        onToggleLayer={() => {
                          this.handleToggleLayer();
                          if (!context.visAktiveLag)
                            context.onToggleAktiveLag();
                        }}
                        meta={this.state.meta}
                        searchFor={this.state.searchFor}
                        onClearSearchFor={this.handleClearSearchFor}
                        onUpdateLayerProp={this.handleUpdateLayerProp}
                        onUpdateMetaProp={this.handleUpdateMetaProp}
                        visAktiveLag={context.visAktiveLag}
                        onToggleAktiveLag={context.onToggleAktiveLag}
                      />
                    )}
                    {context.aktivTab === "kartlag" && (
                      <div
                        className={
                          this.state.showFullscreen
                            ? "hidden_in_fullscreen"
                            : ""
                        }
                      >
                        <Kartlag
                          show_current={this.state.showCurrent}
                          handleShowCurrent={this.handleShowCurrent}
                          hidden={context.aktivTab === "kartlag" && true}
                          aktiveLag={this.state.aktiveLag}
                          onUpdateLayerProp={this.handleUpdateLayerProp}
                          onRemoveSelectedLayer={this.handleRemoveSelectedLayer}
                          navigation_history={this.state.navigation_history}
                          onFitBounds={this.handleFitBounds}
                          history={history}
                          swapOrderOfList={this.swapOrderOfList}
                          currentKartlag={this.state.meta}
                          activateLayerFromHistory={
                            this.activateLayerFromHistory
                          }
                        />
                      </div>
                    )}

                    {/* 
                TODO: 
                sett inn en state her som husker om vi har sett kartet før, så unngår vi å: 
                - laste det inn kart for brukere som ikke går til fanen
                - laste på nytt når det først er hentet ned

                 */}
                    <Kart
                      show_current={this.state.showCurrent}
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
                      history={history}
                      onRemoveSelectedLayer={this.handleRemoveSelectedLayer}
                      onMouseEnter={this.handleMouseEnter}
                      onMouseLeave={this.handleMouseLeave}
                      showFullscreen={this.state.showFullscreen}
                      handleFullscreen={this.handleFullscreen}
                    />
                  </div>
                </>
              )}

              <HamburgerMeny
                spraak={this.state.spraak}
                handleSpraak={this.handleSpraak}
              />
            </>
          );
        }}
      </SettingsContext.Consumer>
    );
  }

  handleActualBoundsChange = bounds => {
    this.setState({ actualBounds: bounds, fitBounds: null });
  };
  handleFitBounds = bbox => {
    this.setState({ fitBounds: bbox });
  };
  handleShowCurrent = show_current => {
    this.setState({ showCurrent: show_current });
  };
  handleBoundsChange = bbox => {
    this.setState({ actualBounds: bbox });
  };
  handleSpraak = spraak => {
    this.setState({ spraak: spraak });
  };

  handleFullscreen = showFullscreen => {
    this.setState({ showFullscreen: !showFullscreen });
    console.log(showFullscreen);
  };
  handleClearSearchFor = () => this.setState({ searchFor: null });
  handleToggleLayer = () => {
    this.addSelected(this.state.meta);
  };
  componentDidMount() {
    fetchMeta(this.props.location.pathname, this);
    //this.handleShowCurrent(false);
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
    const aktive = this.state.aktiveLag;
    this.setState({
      aktiveLag: Object.assign({}, aktiverFraHistorikk(aktive, node))
    });
  };

  swapOrderOfList = node => {
    let aktive = this.state.aktiveLag;
    let keys = Object.keys(aktive);
    let input_index = keys.indexOf(node.kode);
    console.log(input_index);
  };

  componentDidUpdate(prevProps) {
    const path = this.props.location.pathname;
    if (path !== prevProps.location.pathname) {
      fetchMeta(path, this);
    }
    document.title =
      (this.state.meta && språk(this.state.meta.tittel) + " | NiN-kart") ||
      "NiN-kart";
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

  handleUpdateLayerProp = (layer, key, value, elementType) => {
    this.setState({
      aktiveLag: Object.assign(
        {},
        oppdaterLagProperties(layer, key, value, this, elementType)
      )
    });
  };

  handleUpdateMetaProp = (kode, key, value) => {
    this.setState({
      meta: Object.assign({}, oppdaterMetaProperties(kode, key, value, this))
    });
  };

  handleMouseEnter = ({ kode, url }) => {
    // console.log("mouseenter", kode, url);
    this.setState({ opplystKode: kode, opplyst: { kode: kode, url: url } });
  };

  handleMouseLeave = () => {
    // console.log("mouseleave");
    this.setState({ opplystKode: "", opplyst: {} });
  };

  static contextType = SettingsContext;
}

export default withRouter(App);
