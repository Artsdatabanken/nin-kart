import React from "react";
import { SettingsContext } from "../SettingsContext";
import KartlagListeElement from "./KartlagListeElement";
import { Add, KeyboardArrowRight } from "@material-ui/icons";

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
      activateLayerFromHistory
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
                          />
                        )
                      );
                    })}
                  </ul>
                </div>

                <div className="sidebar_element">
                  <h3>Historikk</h3>

                  {Object.keys(navigation_history).map(item => {
                    let node = navigation_history[item];
                    let meta = node.meta;
                    if (meta.url) {
                      return (
                        <>
                          <div className="kartlag_list_title">
                            <div className="kartlag_header">
                              <span className="kartlag_list_title">
                                {meta.tittel.nb}
                              </span>
                              <span className="kartlag_list_icon_set">
                                <button
                                  className="invisible_icon_button add_icon"
                                  onClick={event => {
                                    activateLayerFromHistory(node);
                                  }}
                                >
                                  <Add />
                                </button>

                                <button className="invisible_icon_button ">
                                  <KeyboardArrowRight
                                    onClick={() => history.push("/" + meta.url)}
                                  />
                                </button>
                              </span>
                            </div>
                          </div>
                        </>
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
