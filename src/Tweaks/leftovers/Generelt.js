import React, { Component } from "react";
import TilbakePil from "./FerdigeMiniElement/TilbakePil";
import VizType from "./FerdigeMiniElement/VizType";

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
            <TilbakePil url={url} history={history} />
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
