import React, { useState } from "react";
import "../../style/NavMenu.scss";
import FargeVelger from "../Fargevelgere/FargeVelger";
import VelgFargeboks from "../Fargevelgere/VelgFargeBoks";
import ArrowButton from "../../GjenbruksElement/ArrowButton";
import HideLayerButton from "../Buttons/HideLayerButton";
import MapLayerButton from "../Buttons/MapLayerButton";

const CurrentLayerMainElement = ({
  meta,
  visKode,
  onNavigate,
  onMouseEnter,
  onMouseLeave,
  onUpdateLayerProp
}) => {
  const [showEditColor, setShowEditColor] = useState(false);
  const { kode, url, farge } = meta;
  const erSynlig = meta.hasOwnProperty("erSynlig") ? meta.erSynlig : true;
  console.log(meta.erSynlig);

  const handleExpandClick = () => {
    setShowEditColor(!showEditColor);
  };

  const editColorButton = () => <VelgFargeboks farge={farge} kode={kode} />;

  return (
    <li className="layer_list_element_container">
      <span className="layer_list_element subelement">
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
        />
        <HideLayerButton
          erSynlig={erSynlig}
          onUpdateLayerProp={onUpdateLayerProp}
          kode={kode}
        />
      </span>

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
    </li>
  );
};

export default CurrentLayerMainElement;
