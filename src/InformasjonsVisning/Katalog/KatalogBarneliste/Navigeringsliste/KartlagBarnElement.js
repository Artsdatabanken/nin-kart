import React from "react";
import språk from "Funksjoner/språk";
import getSecondary from "./NavigeringslisteFunksjoner/getSecondary";
import kodeSuffix from "./NavigeringslisteFunksjoner/kodeSuffix";
import "style/NavMenu.scss";

class KartlagBarnElement extends React.Component {
  render() {
    const {
      meta,
      parentkode,
      kode,
      url,
      visKode,
      onNavigate,
      onMouseEnter,
      onMouseLeave,
      isDatakilde
    } = this.props;

    let backgroundSize = "cover",
      borderSize = "0px",
      new_url = "https://data.artsdatabanken.no/" + url + "/foto_408.jpg";
    if (
      isDatakilde === "Datakilde" ||
      new_url.indexOf("Administrativ_grense") !== -1
    ) {
      new_url = "https://data.artsdatabanken.no" + url + "/logo_408.png";
      backgroundSize = "contain";
      borderSize = "10px solid transparent";
    }
    if (new_url.includes("Biota")) {
      new_url = new_url.replace("foto_408.jpg", "phylopic_560.png");
      var img = new Image();
      img.src = new_url;
      if (img.height === 0) {
        borderSize = "70px solid transparent";
        new_url = new_url.replace("phylopic_560.png", "phylopic_48.png");
      } else {
        borderSize = "30px solid transparent";
      }
      backgroundSize = "contain";
    }

    var image = new Image();
    image.src = new_url;
    let imgheight = image.height;

    return (
      <button
        className="katalog_link_displayer"
        key={kode}
        onClick={() => onNavigate(url)}
        onMouseEnter={() => onMouseEnter && onMouseEnter({ kode, url })}
        onMouseLeave={() => onMouseLeave && onMouseLeave()}
      >
        {imgheight === 0 && (
          <div className="subelement_decorative_box">{meta.kode}</div>
        )}
        <div
          className="subelement_decorative_image"
          style={{
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: backgroundSize,
            backgroundImage: "url(" + new_url + ")",
            border: borderSize,
            zIndex: "10"
          }}
        />

        <div className="subelement_text nav_text">
          <span className="nav_title">
            {språk(meta.tittel) === "undefined"
              ? meta.tittel.sn
              : språk(meta.tittel)}
          </span>
          <span className="nav_2ndtitle">{getSecondary(meta)}</span>
        </div>

        {false && visKode && (
          <span className="nav_kode">{kodeSuffix(kode, parentkode)}</span>
        )}
      </button>
    );
  }
}

export default KartlagBarnElement;
