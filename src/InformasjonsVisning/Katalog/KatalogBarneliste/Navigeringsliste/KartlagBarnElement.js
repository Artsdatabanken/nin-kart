import React from "react";
import språk from "Funksjoner/språk";
import getSecondary from "./NavigeringslisteFunksjoner/getSecondary";
import kodeSuffix from "./NavigeringslisteFunksjoner/kodeSuffix";
import "style/NavMenu.css";

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
      onMouseLeave
    } = this.props;

    const new_url = "https://data.artsdatabanken.no/" + url + "/foto_408.jpg";

    return (
      <button
        className="katalog_link_displayer"
        key={kode}
        onClick={() => onNavigate(url)}
        onMouseEnter={() => onMouseEnter && onMouseEnter({ kode, url })}
        onMouseLeave={() => onMouseLeave && onMouseLeave()}
      >
        <div
          className="subelement_decorative_image"
          style={{
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundImage: "url(" + new_url + ")"
          }}
        />
        <div className="subelement_text nav_text">
          <span className="nav_title">{språk(meta.tittel)}</span>
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
