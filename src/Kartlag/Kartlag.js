import React from "react";
import { SettingsContext } from "../SettingsContext";
import AktivtKartlagElement from "./AktiveKartlag/AktivtKartlagElement";
import HistorikkListeElement from "./Historikk/HistorikkListeElement";
import { Favorite, History } from "@material-ui/icons";
import språk from "../Funksjoner/språk";
import CurrentElement from "./CurrentElement/CurrentElement";
import BackToStart from "./BackToStart";
import SidebarHeader from "./SidebarHeader";
import MobileOpenButton from "./MobileOpenButton";
import { List, Tooltip } from "@material-ui/core";

class Kartlag extends React.Component {
  state = {
    showKartlag: false
  };
  render() {
    let koder = this.props.aktiveLag;
    const keys = Object.keys(koder);
    const {
      onFitBounds,
      onUpdateLayerProp,
      hidden,
      history,
      navigation_history,
      activateLayerFromHistory,
      currentKartlag,
      meta
    } = this.props;

    if (navigation_history.length > 11) {
      /* History length limitation. When surpassing this limit, it removes the earliest entry */
      navigation_history.shift();
    }

    let tittel = "hjelp";

    if (currentKartlag) {
      tittel = språk(currentKartlag.tittel);
    }
    if (tittel.length > 40) {
      tittel = tittel.substring(0, 40) + "...";
    }

    let isstartpage = false;
    if (
      this.props.path === "/kart" ||
      this.props.path === "/hjem" ||
      this.props.path === "/start" ||
      this.props.path === "/index" ||
      this.props.path === "/map"
    ) {
      isstartpage = true;
    }

    return (
      <>
        {hidden && (
          <SettingsContext.Consumer>
            {context => (
              <>
                <MobileOpenButton
                  showKartlag={this.state.showKartlag}
                  setShowKartlag={() => {
                    this.setState({ showKartlag: !this.state.showKartlag });
                  }}
                  props={this.props}
                />

                <div
                  className={
                    "kartlag sidebar " +
                    (this.state.showKartlag
                      ? "kartlag_content_open"
                      : "kartlag_content_closed")
                  }
                >
                  <SidebarHeader />

                  <BackToStart
                    isstartpage={isstartpage}
                    onNavigate={this.props.onNavigate}
                  />

                  <CurrentElement
                    aktiveLag={this.props.aktiveLag}
                    meta={this.props.meta}
                    onNavigate={this.props.onNavigate}
                    aktivTab={this.props.aktivTab}
                    onSetAktivTab={this.props.onSetAktivTab}
                    handleShowInfo={this.props.handleShowInfo}
                    showInfo={this.props.showInfo}
                    onUpdateMetaProp={this.props.onUpdateMetaProp}
                    onToggleLayer={this.props.onToggleLayer}
                    opplyst={this.props.opplyst}
                    onMouseEnter={this.props.onMouseEnter}
                    onMouseLeave={this.props.onMouseLeave}
                    path={this.props.path}
                    parent={this.props.parent}
                    isstartpage={isstartpage}
                    onUpdateLayerProp={onUpdateLayerProp}
                  />

                  <div className="section">
                    <Tooltip
                      title="Disse kartlagene vises alltid i kartet"
                      aria-label="Disse kartlagene vises alltid i kartet"
                    >
                      <h3 className="kartlag_header">
                        <Favorite />
                        Mine kartlag
                      </h3>
                    </Tooltip>
                    <List>
                      <ul className="kartlag_list">
                        {keys.reverse().map(fkode => {
                          const kartlag = koder[fkode];
                          return (
                            <AktivtKartlagElement
                              kartlag={kartlag}
                              key={fkode}
                              {...this.props}
                              visKoder={context.visKoder}
                              onFitBounds={onFitBounds}
                              onUpdateLayerProp={onUpdateLayerProp}
                              meta={meta}
                            />
                          );
                        })}
                      </ul>
                    </List>
                  </div>

                  {false && (
                    <div class="section">
                      <h2>Bakgrunnskart</h2>
                      <ul className="kartlag_list">
                        <AktivtKartlagElement
                          kartlag={koder["bakgrunnskart"]}
                          key={"bakgrunnskart"}
                          {...this.props}
                          visKoder={context.visKoder}
                        />
                      </ul>
                    </div>
                  )}

                  {Object.keys(navigation_history).length > 1 && (
                    <div className="section">
                      <h3 className="kartlag_header">
                        <History />
                        Historikk
                      </h3>
                      <List>
                        {Object.keys(navigation_history)
                          .reverse()
                          .map((item, index) => {
                            const node = navigation_history[item];
                            if (
                              currentKartlag &&
                              (node === currentKartlag ||
                                node.meta.kode === currentKartlag.kode)
                            )
                              return "";
                            if (node.meta.url) {
                              return (
                                <HistorikkListeElement
                                  meta={node.meta}
                                  activateLayerFromHistory={
                                    activateLayerFromHistory
                                  }
                                  node={node}
                                  history={history}
                                  key={index + node.meta.kode}
                                />
                              );
                            }
                            return null;
                          })}
                      </List>
                    </div>
                  )}
                </div>
              </>
            )}
          </SettingsContext.Consumer>
        )}
      </>
    );
  }
}

export default Kartlag;
