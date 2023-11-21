import React from "react";
import MapLayerButton from "../Buttons/MapLayerButton";
import { useNavigate } from 'react-router-dom'

const HistorikkListeElement = ({ meta }) => {
  const navigate = useNavigate();
  if (!meta) return;

  const onNavigate = url => {
    navigate(url);
  };

  return (
    <li className="layer_list_element_container">
      <span className="layer_list_element">
        <MapLayerButton
          onNavigate={onNavigate}
          url={meta.url}
          kode={false}
          visKode={"visKode"}
          meta={meta}
        />
      </span>
    </li>
  );
};

export default HistorikkListeElement;
