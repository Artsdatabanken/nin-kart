import React from "react";
import { SettingsContext } from "../SettingsContext";
import KartlagListeElement from "./KartlagListeElement";

class Kartlag extends React.Component {
  render() {
    let koder = this.props.aktiveLag;
    const keys = Object.keys(koder);
    const { onFitBounds, onUpdateLayerProp } = this.props;

    return (
      <SettingsContext.Consumer>
        {context => (
          <div className="kartlag sidebar">
            <div className="sidebar_title_container sidebar_element">
              <h1 className="sidebar_title">Kartlag</h1>
            </div>
            <div className="sidebar_element">
              <h3>Instillinger</h3>
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
                        {...this.props}
                        visKoder={context.visKoder}
                        onFitBounds={onFitBounds}
                        onUpdateLayerProp={onUpdateLayerProp}
                      />
                    )
                  );
                })}
              </ul>
            </div>
            {/*
            <div className="sidebar_element">
              <h3>Historikk</h3>
              <ul className="kartlag_list">
                <li>kommer her</li>
              </ul>
            </div>*/}
          </div>
        )}
      </SettingsContext.Consumer>
    );
  }
}

export default Kartlag;
