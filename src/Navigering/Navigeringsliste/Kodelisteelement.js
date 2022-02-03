import React from "react";
import språk from "../../Funksjoner/språk";
import isItalics from "../../Funksjoner/isItalics";
import Bildeavatar from "../../GjenbruksElement/Bildeavatar";
import VolumIndikator from "./VolumIndikator";
import "../../style/NavMenu.scss";
import VelgFargeboks from "../../Kartlag/AktiveKartlag/EkspandertMeny/FellesElementer/VelgFargeBoks";
import { ChevronRight } from "@material-ui/icons";
import constants from "../../constants";
import { getInterval } from "../../helpers";

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

    let tittel = språk(meta.tittel);
    let sn = meta.tittel["sn"] && meta.tittel["sn"] === tittel;
    if (tittel === "undefined") {
      tittel = meta.tittel["sn"];
      sn = true;
    }

    // TODO: FIX: HALF THESE ELEMENTS DONT WORK AS OF now

    return (
      <button
        key={kode}
        onClick={() => {
          setExpanded(false);
          onNavigate(url);
        }}
        onMouseEnter={() => onMouseEnter && onMouseEnter({ kode, url })}
        onMouseLeave={() => onMouseLeave && onMouseLeave()}
        className="nav_menu_button"
      >
        <VelgFargeboks farge={meta.farge} kode={meta.kode} />

        {false && (
          <>
            <VolumIndikator størsteAreal={størsteAreal} areal={areal} />
            <Bildeavatar url={url} />
          </>
        )}
        <div
          className={
            isItalics(meta["nivå"] || null, sn)
              ? "italics nav_text"
              : "nav_text"
          }
        >
          <span className="nav_title">{tittel}</span>
          {meta.intervall && (
            <span className="nav_2ndtitle">
              {constants.interval}: {getInterval(meta.intervall)}
            </span>
          )}
          {visKode && <span className="nav_kode">{kode}</span>}
        </div>
        <ChevronRight />
      </button>
    );
  }
}

export default Kodelisteelement;
