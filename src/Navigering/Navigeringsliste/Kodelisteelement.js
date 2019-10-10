import React from "react";
import språk from "Funksjoner/språk";
import Bildeavatar from "GjenbruksElement/Bildeavatar";
import VolumIndikator from "./VolumIndikator";
import getSecondary from "./NavigeringslisteFunksjoner/getSecondary";
import kodeSuffix from "./NavigeringslisteFunksjoner/kodeSuffix";
import "style/NavMenu.scss";

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
      størsteAreal,
      setExpanded
    } = this.props;
    let overordnet = "";
    if (meta) {
      overordnet = meta.overordnet;
    }

    return (
      <>
        <button
          key={kode}
          onClick={() => {
            setExpanded(false);
            onNavigate(url);
          }}
          onMouseEnter={() => onMouseEnter && onMouseEnter({ kode, url })}
          onMouseLeave={() => onMouseLeave && onMouseLeave()}
          className="nav_menu_button nav_down_menu"
        >
          <VolumIndikator størsteAreal={størsteAreal} areal={areal} />
          <Bildeavatar url={url} />
          <div className="nav_text">
            {(overordnet === "Slekt" ||
              overordnet === "Art" ||
              overordnet === "Underart" ||
              overordnet === "Varietet") && (
              <i>
                <span className="nav_title">
                  {språk(meta.tittel) === "undefined"
                    ? meta.tittel.sn
                    : språk(meta.tittel)}
                </span>
              </i>
            )}

            {overordnet !== "Slekt" &&
              overordnet !== "Art" &&
              overordnet !== "Underart" &&
              overordnet !== "Varietet" && (
                <span className="nav_title">
                  {språk(meta.tittel) === "undefined"
                    ? meta.tittel.sn
                    : språk(meta.tittel)}
                </span>
              )}
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
