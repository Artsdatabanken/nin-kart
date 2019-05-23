import React from "react";
import { SettingsContext } from "../SettingsContext";
import KartlagListeElement from "./MineKartlag/KartlagListeElement";
import HistorikkListeElement from "./Historikk/HistorikkListeElement";

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
      meta
    } = this.props;

    return (
      <>
        {hidden && (
          <SettingsContext.Consumer>
            {context => (
              <div className="kartlag sidebar">
                <div className="sidebar_element page_topic_header" />
                <div className="sidebar_title_container sidebar_element">
                  <h1 className="sidebar_title">Kartlag</h1>
                </div>
                <div className="sidebar_element">
                  <h3>Innstillinger</h3>
                  <ul className="kartlag_list">
                    <KartlagListeElement
                      kartlag={koder["bakgrunnskart"]}
                      {...this.props}
                      visKoder={context.visKoder}
                    />
                  </ul>
                </div>

                <div className="sidebar_element">
                  <h3>Mine Kartlag</h3>
                  <ul className="kartlag_list">
                    {keys.map(fkode => {
                      const kartlag = koder[fkode];
                      return (
                        fkode !== "bakgrunnskart" && (
                          <KartlagListeElement
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
                  <h3>Historikk</h3>

                  {Object.keys(navigation_history).map(item => {
                    const node = navigation_history[item];
                    if (node.meta.url) {
                      return (
                        <HistorikkListeElement
                          meta={node.meta}
                          activateLayerFromHistory={activateLayerFromHistory}
                          node={node}
                          history={history}
                        />
                      );
                    }
                    return <></>;
                  })}
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
