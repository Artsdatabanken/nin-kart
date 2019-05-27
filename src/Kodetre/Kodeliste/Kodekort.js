import React from "react";
import språk from "Funksjoner/språk";
import Tittelblokk from "./Tittelblokk";
import tinycolor from "tinycolor2";

import { kontrastfarge } from "Funksjoner/farger";

class Kodekort extends React.Component {
  // This component is used in the top part of the sidebar,
  // contains image, header-row (Tittelblokk), and the zoom button navbar (Knapperad)
  erTransparent(url) {
    if (url.startsWith("Fylke")) return true;
    if (url.startsWith("Datakilde/")) return true;
    return false;
  }

  render() {
    const {
      kode,
      url,
      farge,
      prefiks,
      tittel,
      nivå,
      overordnet,
      onNavigate,
      bilde,
      bbox,
      onFitBounds
    } = this.props;
    const tc = new tinycolor(farge);

    var new_url = "no_image";
    if (bilde.foto != null) {
      new_url = bilde.foto.url;
    }

    return (
      <div className="sidebar_top_area sidebar_background_element">
        <div className="sidebar_element page_topic_header" />

        <div
          className={
            (this.erTransparent(url) &&
              "sidebar_top_image  trasparent_image") ||
            "sidebar_top_image"
          }
          onClick={this.handleOpen}
          style={
            (new_url !== "no_image" && {
              backgroundImage: "url(" + new_url + ")"
            }) || { height: 0 }
          }
          alt={"foto av " + språk(tittel)}
        />

        <Tittelblokk
          tittel={språk(tittel)}
          farge={tc.desaturate(30).toHexString()}
          chipFarge={tc
            //            .desaturate(10)
            .lighten(10)
            .toHexString()}
          kontrastfarge={kontrastfarge(farge)}
          nivå={nivå}
          kode={kode}
          prefiks={prefiks}
          onNavigate={onNavigate}
          overordnet={overordnet}
          onFitBounds={onFitBounds}
          bbox={bbox}
        />
      </div>
    );
  }
}

export default Kodekort;
