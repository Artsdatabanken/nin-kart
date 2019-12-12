import React from "react";
import { SettingsContext } from "SettingsContext";
import AktivtKartlagElement from "./AktiveKartlag/AktivtKartlagElement";
import HistorikkListeElement from "./Historikk/HistorikkListeElement";
import { KeyboardArrowDown, KeyboardArrowUp } from "@material-ui/icons";
import språk from "Funksjoner/språk";
import NatursystemAdvarsel from "InformasjonsVisning/Katalog/NatursystemAdvarsel";

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
      onRemoveSelectedLayer
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

    return (
      <>
        {hidden && (
          <SettingsContext.Consumer>
            {context => (
              <>
                <button
                  className={
                    this.state.showKartlag
                      ? "mobile_slide_up_area open_mobile_slide_up_area"
                      : "mobile_slide_up_area closed_mobile_slide_up_area"
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

                  <div
                    className={
                      this.state.showKartlag
                        ? "kartlag_content_open kartlag_content"
                        : "kartlag_content_closed kartlag_content"
                    }
                  >
                    <div className="sidebar_title_container sidebar_element">
                      <h1 className="sidebar_title">Kartlag</h1>
                    </div>

                    {currentKartlag && !duplicate && (
                      <>
                        <NatursystemAdvarsel kode={currentKartlag.kode} />
                        <div className="sidebar_element">
                          <h2>Nåværende kartlag</h2>
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
                      </>
                    )}

                    <div className="sidebar_element">
                      <h2>Mine kartlag</h2>
                      <ul className="kartlag_list">
                        {keys.reverse().map(fkode => {
                          const kartlag = koder[fkode];
                          return (
                            fkode !== "bakgrunnskart" && (
                              <AktivtKartlagElement
                                kartlag={kartlag}
                                key={fkode}
                                {...this.props}
                                visKoder={context.visKoder}
                                onFitBounds={onFitBounds}
                                onUpdateLayerProp={onUpdateLayerProp}
                                meta={meta}
                              />
                            )
                          );
                        })}
                      </ul>
                    </div>
                    <div className="sidebar_element">
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
                    <div className="sidebar_element">
                      <h2>Historikk</h2>

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
                    </div>
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
