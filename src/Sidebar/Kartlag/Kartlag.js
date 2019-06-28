import React from "react";
import { SettingsContext } from "SettingsContext";
import AktivtKartlagElement from "./AktiveKartlag/AktivtKartlagElement";
import HistorikkListeElement from "./Historikk/HistorikkListeElement";
import { KeyboardArrowDown, KeyboardArrowUp } from "@material-ui/icons";

class Kartlag extends React.Component {
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
      handleShowCurrent
    } = this.props;

    let duplicate = false;
    if (!currentKartlag) return null;
    if (currentKartlag && currentKartlag.kode) {
      for (let item in keys) {
        if (keys[item] === currentKartlag.kode) {
          duplicate = true;
        }
      }
    }

    if (navigation_history.length > 11) {
      /* History length limitation. When surpassing this limit, it removes the earliest entry */
      navigation_history.shift();
    }

    return (
      <>
        {hidden && (
          <SettingsContext.Consumer>
            {context => (
              <div className="kartlag sidebar">
                <div className="page_topic_header" />

                <button className="mobile_slide_up_area">
                  <KeyboardArrowDown />
                  <KeyboardArrowUp />
                  mobil kartlagfane
                </button>
                <div className="kartlag_content_open">
                  {" "}
                  <div className="sidebar_title_container sidebar_element">
                    <h1 className="sidebar_title">Kartlag</h1>
                  </div>
                  {!duplicate && (
                    <div className="sidebar_element">
                      <h2>Nåværende kartlag</h2>
                      <ul className="kartlag_list">
                        <AktivtKartlagElement
                          kartlag={currentKartlag}
                          {...this.props}
                          visKoder={context.visKoder}
                          erAktivtLag={true}
                          show_current={show_current}
                          handleShowCurrent={handleShowCurrent}
                          is_current_object={true}
                          activateLayerFromHistory={activateLayerFromHistory}
                          navhist={
                            navigation_history[navigation_history.length - 1]
                          } // add last item in list
                        />
                      </ul>
                    </div>
                  )}
                  <div className="sidebar_element">
                    <h2>Mine Kartlag</h2>
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
                      .map(item => {
                        const node = navigation_history[item];

                        if (
                          node.meta.url &&
                          node !== currentKartlag &&
                          node.meta.kode !== currentKartlag.kode
                        ) {
                          return (
                            <HistorikkListeElement
                              meta={node.meta}
                              activateLayerFromHistory={
                                activateLayerFromHistory
                              }
                              node={node}
                              history={history}
                              key={node.meta.kode}
                            />
                          );
                        }
                        return <></>;
                      })}
                  </div>
                </div>
              </div>
            )}
          </SettingsContext.Consumer>
        )}
      </>
    );
  }
}

export default Kartlag;
