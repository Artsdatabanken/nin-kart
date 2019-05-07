import { ArrowBackIos } from "@material-ui/icons/";
import React, { Component } from "react";
import VizType from "./VizType";

class Generelt extends Component {
  render() {
    const {
      children,
      kart,
      kode,
      url,
      history,
      onUpdateLayerProp
    } = this.props;
    return (
      <div className="sidebar_element">
        {history.location.search === "?vis" && kode !== "bakgrunnskart" && (
          <>
            <div className="back_to_menu">
              {url && (
                <button
                  className="invisible_icon_button"
                  onClick={() => {
                    history.push("/" + url);
                  }}
                >
                  <ArrowBackIos className="iconSmall" />
                </button>
              )}
            </div>
            <h3>Visualisering</h3>
            <VizType
              lag={kode}
              onUpdateLayerProp={onUpdateLayerProp}
              format={kart.format}
              aktivtFormat={kart.aktivtFormat}
            />
          </>
        )}

        {children}
      </div>
    );
  }
}

export default Generelt;
