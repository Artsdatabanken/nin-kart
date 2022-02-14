import React, { useState } from "react";
import HideLayerButton from "../Buttons/HideLayerButton";
import { Settings, Close } from "@material-ui/icons";
import { useHistory } from "react-router-dom";
import LayerButton from "../Buttons/LayerButton";
import MapLayerButton from "../Buttons/MapLayerButton";
import BackgroundSettings from "./BackgroundSettings";

const FavoriteLayerElement = ({ kartlag, onUpdateLayerProp }) => {
  const [expandedSub, setExpandedSub] = useState(false);
  const history = useHistory();
  if (!kartlag) return null;
  const { kode } = kartlag;
  const handleExpandClick = () => {
    setExpandedSub(!expandedSub);
  };
  const onNavigate = where => {
    history.push(where);
  };

  return (
    <>
      <div className="map_layer_navigation">
        <MapLayerButton
          onNavigate={onNavigate}
          onMouseEnter={false}
          onMouseLeave={false}
          url={kartlag.url}
          kode={kode}
          visKode={false}
          meta={kartlag}
        />

        <HideLayerButton
          erSynlig={kartlag.erSynlig}
          onUpdateLayerProp={onUpdateLayerProp}
          kode={kode}
        />

        {kode === "bakgrunnskart" ? (
          <LayerButton
            icon={<Settings />}
            onClick={handleExpandClick}
            title={"Åpne innstillinger"}
          />
        ) : (
          <LayerButton
            icon={<Close />}
            onClick={handleExpandClick}
            title={"Fjern fra favoritter"}
          />
        )}
      </div>

      {expandedSub && (
        <BackgroundSettings
          kartlag={kartlag}
          onUpdateLayerProp={onUpdateLayerProp}
        />
      )}
    </>
  );
};

export default FavoriteLayerElement;
