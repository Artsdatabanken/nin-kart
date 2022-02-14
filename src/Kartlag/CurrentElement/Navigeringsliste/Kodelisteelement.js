import React, { useState } from "react";
import "../../../style/NavMenu.scss";
import FargeVelger from "../../../Kartlag/AktiveKartlag/EkspandertMeny/FellesElementer/FargeVelger";
import VelgFargeboks from "../../../Kartlag/AktiveKartlag/EkspandertMeny/FellesElementer/VelgFargeBoks";
import ArrowButton from "../../../GjenbruksElement/ArrowButton";
import HideLayerButton from "../../Buttons/HideLayerButton";
import MapLayerButton from "../../Buttons/MapLayerButton";

const Kodelisteelement = ({
  meta,
  visKode,
  onNavigate,
  onMouseEnter,
  onMouseLeave,
  onUpdateLayerProp
  //  areal,
  //  størsteAreal,
}) => {
  const [showEditColor, setShowEditColor] = useState(false);

  const erSynlig = meta.hasOwnProperty("erSynlig") ? meta.erSynlig : true;
  const { kode, url, farge } = meta;

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

        <MapLayerButton
          onNavigate={onNavigate}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          url={url}
          kode={kode}
          visKode={visKode}
          meta={meta}
          //  areal,
          //  størsteAreal,
        />

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
