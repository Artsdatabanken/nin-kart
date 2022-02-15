import React, { useState } from "react";
import HideLayerButton from "../Buttons/HideLayerButton";
import { Settings } from "@material-ui/icons";
import { useHistory } from "react-router-dom";
import LayerButton from "../Buttons/LayerButton";
import FavoriteButton from "../Buttons/FavoriteButton";
import MapLayerButton from "../Buttons/MapLayerButton";
import BackgroundSettings from "./BackgroundSettings";
import { Wallpaper } from "@material-ui/icons";

const FavoriteLayerElement = ({
  kartlag,
  onUpdateLayerProp,
  onToggleLayer
}) => {
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
    <li>
      <span className="layer_list_element">
        {kode === "bakgrunnskart" ? (
          <>
            <LayerButton
              icon={<Settings />}
              onClick={handleExpandClick}
              title={"Åpne innstillinger"}
            />
            {false && <LayerButton icon={<Wallpaper />} onClick={false} />}
          </>
        ) : (
          <FavoriteButton
            onToggleLayer={onToggleLayer}
            turnedOn={true}
            removeFave={true}
          />
        )}

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
      </span>

      {expandedSub && (
        <BackgroundSettings
          kartlag={kartlag}
          onUpdateLayerProp={onUpdateLayerProp}
        />
      )}
    </li>
  );
};

export default FavoriteLayerElement;
