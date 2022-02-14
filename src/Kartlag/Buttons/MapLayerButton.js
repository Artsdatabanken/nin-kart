import React from "react";
import språk from "../../Funksjoner/språk";
import { getInterval } from "../../helpers";
import isItalics from "../../Funksjoner/isItalics";
import constants from "../../constants";
//import VolumIndikator from "./VolumIndikator";
import { ChevronRight } from "@material-ui/icons";
const MapLayerButton = ({
  onNavigate,
  onMouseEnter,
  onMouseLeave,
  url,
  kode,
  visKode,
  meta
}) => {
  let tittel = språk(meta.tittel);
  let sn = meta.tittel["sn"] && meta.tittel["sn"] === tittel;
  if (tittel === "undefined") {
    tittel = meta.tittel["sn"];
    sn = true;
  }
  return (
    <button
      key={kode}
      onClick={() => {
        onNavigate(url);
      }}
      onMouseEnter={() => onMouseEnter && onMouseEnter({ kode, url })}
      onMouseLeave={() => onMouseLeave && onMouseLeave()}
      className="nav_menu_button"
    >
      {
        ///<VolumIndikator størsteAreal={størsteAreal} areal={areal} />
      }
      <div
        className={
          "nav_text " + (isItalics(meta["nivå"] || null, sn) && "italics")
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
};
export default MapLayerButton;
