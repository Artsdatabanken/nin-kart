import React, { useState } from "react";
import språk from "../../../Funksjoner/språk";
import isItalics from "../../../Funksjoner/isItalics";
import VolumIndikator from "./VolumIndikator";
import "../../../style/NavMenu.scss";
import FargeVelger from "../../../Kartlag/AktiveKartlag/EkspandertMeny/FellesElementer/FargeVelger";
import VelgFargeboks from "../../../Kartlag/AktiveKartlag/EkspandertMeny/FellesElementer/VelgFargeBoks";
import ArrowButton from "../../../GjenbruksElement/ArrowButton";
import Bildeavatar from "../../../GjenbruksElement/Bildeavatar";
import HideLayerButton from "../../Buttons/HideLayerButton";
import constants from "../../../constants";
import { getInterval } from "../../../helpers";
import { ChevronRight } from "@material-ui/icons";

const Kodelisteelement = ({
  meta,
  visKode,
  onNavigate,
  onMouseEnter,
  onMouseLeave,
  areal,
  størsteAreal,
  onUpdateLayerProp
}) => {
  const [showEditColor, setShowEditColor] = useState(false);

  const erSynlig = meta.hasOwnProperty("erSynlig") ? meta.erSynlig : true;
  const { kode, url, farge } = meta;

  let tittel = språk(meta.tittel);
  let sn = meta.tittel["sn"] && meta.tittel["sn"] === tittel;
  if (tittel === "undefined") {
    tittel = meta.tittel["sn"];
    sn = true;
  }

  const handleExpandClick = () => {
    setShowEditColor(!showEditColor);
  };

  const editColorButton = () => <VelgFargeboks farge={farge} kode={kode} />;

  return (
    <div className="map_layer_navigation_container">
      <div className="map_layer_navigation">
        <ArrowButton
          title={editColorButton()}
          expanded={showEditColor}
          handleExpandClick={handleExpandClick}
        />
        <button
          key={kode}
          onClick={() => {
            onNavigate(url);
          }}
          onMouseEnter={() => onMouseEnter && onMouseEnter({ kode, url })}
          onMouseLeave={() => onMouseLeave && onMouseLeave()}
          className="nav_menu_button"
        >
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

        <HideLayerButton
          erSynlig={erSynlig}
          onUpdateLayerProp={onUpdateLayerProp}
          kode={kode}
        />
      </div>
      {showEditColor && (
        <div class="subsection subexpand">
          <FargeVelger
            color={farge}
            onUpdateLayerProp={onUpdateLayerProp}
            where={kode}
            elementType={"barn"}
          />
        </div>
      )}
    </div>
  );
};

export default Kodelisteelement;
