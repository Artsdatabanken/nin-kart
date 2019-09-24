import React from "react";
import { SettingsContext } from "SettingsContext";
import AktivtKartlagElement from "Kartlag/AktiveKartlag/AktivtKartlagElement";
import ForvaltningsEkspanderTopp from "./ForvaltningsEkspanderTopp";
import { KeyboardArrowDown, KeyboardArrowUp } from "@material-ui/icons";

class Kartlag extends React.Component {
  state = {
    showKartlag: false
  };
  render() {
    const { aktiveLag, onFitBounds, onUpdateLayerProp, hidden } = this.props;
    let koder = aktiveLag;
    const keys = Object.keys(koder);
    return (
      <>
        {hidden && (
          <SettingsContext.Consumer>
            {context => (
              <>
                <button
                  className={
                    this.state.showKartlag
                      ? "forvaltnings mobile_slide_up_area open_mobile_slide_up_area"
                      : "forvaltnings mobile_slide_up_area closed_mobile_slide_up_area"
                  }
                  onClick={() => {
                    this.setState({ showKartlag: !this.state.showKartlag });
                  }}
                >
                  {this.state.showKartlag ? (
                    <KeyboardArrowDown />
                  ) : (
                    <KeyboardArrowUp />
                  )}
                </button>

                <div
                  className={
                    this.state.showKartlag
                      ? "forvaltningsportal_kartlag kartlag_content_open kartla"
                      : "forvaltningsportal_kartlag kartlag_content_closed kartlag"
                  }
                >
                  <div className="kartlag_content">
                    <div className="sidebar_element">
                      <ul className="kartlag_list">
                        {keys.reverse().map(fkode => {
                          const kartlag = koder[fkode];
                          return (
                            fkode !== "bakgrunnskart" && (
                              <>
                                <ForvaltningsEkspanderTopp
                                  kartlag={kartlag}
                                  key={fkode}
                                  {...this.props}
                                  visKoder={context.visKoder}
                                  onFitBounds={onFitBounds}
                                  onUpdateLayerProp={onUpdateLayerProp}
                                />
                              </>
                            )
                          );
                        })}
                      </ul>
                    </div>
                    <div className="sidebar_element">
                      <ul className="kartlag_list">
                        <AktivtKartlagElement
                          kartlag={koder["bakgrunnskart"]}
                          key={"bakgrunnskart"}
                          {...this.props}
                          visKoder={context.visKoder}
                        />
                      </ul>
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
