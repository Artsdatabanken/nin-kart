import React from "react";
import språk from "Funksjoner/språk";
import Bildeavatar from "GjenbruksElement/Bildeavatar";
import VolumIndikator from "./VolumIndikator";
import getSecondary from "./NavigeringslisteFunksjoner/getSecondary";
import kodeSuffix from "./NavigeringslisteFunksjoner/kodeSuffix";
import "style/NavMenu.css";

class Kodelisteelement extends React.Component {
  shouldComponentUpdate(np) {
    if (np.areal !== this.props.areal) return true;
    if (np.value !== this.props.value) return true;
    if (np.opplyst !== this.props.opplyst) return true;
    return false;
  }

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
      areal,
      størsteAreal
    } = this.props;
    return (
      <>
        <button
          key={kode}
          onClick={() => onNavigate(url)}
          onMouseEnter={() => onMouseEnter && onMouseEnter({ kode, url })}
          onMouseLeave={() => onMouseLeave && onMouseLeave()}
          className="nav_menu_button"
        >
          <VolumIndikator størsteAreal={størsteAreal} areal={areal} />

          <Bildeavatar url={url} />
          <div className="nav_text">
            <span className="nav_title">{språk(meta.tittel)}</span>
            <span className="nav_2ndtitle">{getSecondary(meta)}</span>
          </div>
          {visKode && (
            <span className="nav_kode">{kodeSuffix(kode, parentkode)}</span>
          )}
        </button>
        {/*kode === 'LA-KLG-AI' && (
          <ListItem>
            <Arealbruksintensitet value={meta.value} onChange={onChange} />
          </ListItem>
        )*/}
      </>
    );
  }
}

export default Kodelisteelement;
