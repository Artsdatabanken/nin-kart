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
      onToggleLayer
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
                    let location = navigation_history[item];
                    if (location) {
                      let where = location.split("/").slice(-1)[0];
                      where = where.replace(/_/g, " ");
                      //console.log(where);
                      return (
                        <>
                          <div className="kartlag_list_title">
                            <div className="kartlag_header">
                              <span className="kartlag_list_title">
                                {where}
                              </span>
                              <span class="kartlag_list_icon_set">
                                <button
                                  class="invisible_icon_button add_icon"
                                  onClick={event => {
                                    onToggleLayer();
                                  }}
                                >
                                  <Add />
                                </button>

                                <button class="invisible_icon_button ">
                                  <KeyboardArrowRight
                                    onClick={() => history.push({ location })}
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
