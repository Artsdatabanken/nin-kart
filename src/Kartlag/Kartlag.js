import React from "react";
import { SettingsContext } from "../SettingsContext";
import AktivtKartlagElement from "./AktiveKartlag/AktivtKartlagElement";
import HistorikkListeElement from "./Historikk/HistorikkListeElement";
import {
  KeyboardArrowDown,
  KeyboardArrowUp,
  Layers,
  Favorite,
  History,
  ArrowBack
} from "@material-ui/icons";
import språk from "../Funksjoner/språk";
import Meny from "../Navigering/Meny";
import {
  List,
  ListItemAvatar,
  ListItem,
  ListItemText,
  Tooltip
} from "@material-ui/core";

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
      meta,
      show_current,
      handleShowCurrent,
      onRemoveSelectedLayer,
      lokalitetdata,
      aktivTab
    } = this.props;
    let duplicate = false;

    if (currentKartlag && currentKartlag.kode) {
      for (var item in keys) {
        if (keys[item] === currentKartlag.kode) {
          duplicate = true;
        }
      }
    }

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

    let isPunkt =
      aktivTab === "punkt" || aktivTab === "kartlegging" ? "mobile_off" : "";

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
                <button
                  className={
                    this.state.showKartlag
                      ? "mobile_slide_up_area open_mobile_slide_up_area" +
                        isPunkt
                      : "mobile_slide_up_area closed_mobile_slide_up_area" +
                        isPunkt
                  }
                  onClick={() => {
                    this.setState({ showKartlag: !this.state.showKartlag });
                  }}
                >
                  {this.state.showKartlag ? (
                    <KeyboardArrowDown />
                  ) : (
                    <>
                      <KeyboardArrowUp />
                      <span>Aktivt kartlag</span>
                      <span> {tittel}</span>
                    </>
                  )}
                </button>

                <div
                  className={
                    this.state.showKartlag
                      ? "kartlag_content_open kartlag sidebar"
                      : "kartlag_content_closed kartlag sidebar"
                  }
                >
                  <div className="page_topic_header" />
                  <div className="section">
                    <h2 className="kartlag_header">
                      <Layers />
                      Kartlag
                    </h2>
                  </div>

                  {!isstartpage && (
                    <ListItem
                      button
                      onClick={() => {
                        this.props.onNavigate("/kart");
                      }}
                    >
                      <ListItemAvatar>
                        <ArrowBack style={{ color: "rgba(0,0,0,0.54)" }} />
                      </ListItemAvatar>

                      <ListItemText
                        primary={"Tilbake til start"}
                      ></ListItemText>
                    </ListItem>
                  )}

                  <div
                    className={
                      this.state.showKartlag
                        ? "kartlag_content_open kartlag_content"
                        : "kartlag_content_closed kartlag_content"
                    }
                  >
                    <Meny
                      aktiveLag={this.props.aktiveLag}
                      lokalitetdata={this.props.lokalitetdata}
                      lokalitet={this.props.lokalitet}
                      meta={this.props.meta}
                      onNavigate={this.props.onNavigate}
                      aktivTab={this.props.aktivTab}
                      onSetAktivTab={this.props.onSetAktivTab}
                      onUpdateMetaProp={this.props.onUpdateMetaProp}
                      onToggleLayer={this.props.onToggleLayer}
                      opplyst={this.props.opplyst}
                      onMouseEnter={this.props.onMouseEnter}
                      onMouseLeave={this.props.onMouseLeave}
                      handleHovedMeny={this.props.handleHovedMeny}
                      path={this.props.path}
                      parent={this.props.parent}
                      isstartpage={isstartpage}
                    />

                    {false && (
                      <div class="section">
                        <div className="sidebar_title_container sidebar_element">
                          <h2 className="sidebar_title">Kartlag</h2>
                        </div>
                      </div>
                    )}

                    {false && currentKartlag && !duplicate && (
                      <div class="section">
                        <div className="sidebar_element">
                          {false && <h2>Nåværende kartlag</h2>}
                          <ul className="kartlag_list">
                            <AktivtKartlagElement
                              key={currentKartlag}
                              onRemoveSelectedLayer={onRemoveSelectedLayer}
                              kartlag={currentKartlag}
                              {...this.props}
                              visKoder={context.visKoder}
                              erAktivtLag={true}
                              show_current={show_current}
                              handleShowCurrent={handleShowCurrent}
                              is_current_object={true}
                              activateLayerFromHistory={
                                activateLayerFromHistory
                              }
                              navhist={
                                navigation_history[
                                  navigation_history.length - 1
                                ]
                              } // add last item in list
                            />
                          </ul>
                        </div>
                      </div>
                    )}

                    {lokalitetdata && (
                      <div className="section">
                        <h3 className="kartlag_header">Nåværende lokalitet</h3>
                        <ul className="kartlag_list">
                          {Object.keys(lokalitetdata).map(mapkode => {
                            // console.log("mapkode",mapkode);
                            const kartlag = lokalitetdata[mapkode];
                            //console.log(kartlag)

                            return (
                              <AktivtKartlagElement
                                erLokalitet={true}
                                kartlag={kartlag}
                                key={kartlag.kode}
                                {...this.props}
                                visKoder={context.visKoder}
                                onFitBounds={onFitBounds}
                                onUpdateLayerProp={
                                  this.props.handleUpdateLokalitetLayerProp
                                }
                              />
                            );
                          })}
                        </ul>
                      </div>
                    )}

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
