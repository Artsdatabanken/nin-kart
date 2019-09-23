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
    const { onFitBounds, onUpdateLayerProp, hidden, meta } = this.props;
    let koder = meta.barn || {};
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
                    </>
                  )}
                </button>

                <div className="forvaltningsportal_kartlag kartlag">
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
                                  meta={meta}
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
