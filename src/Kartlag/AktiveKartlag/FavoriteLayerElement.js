import React, { useState } from "react";
import HideLayerButton from "../Buttons/HideLayerButton";
import {
  ListItem,
  ListItemSecondaryAction,
  ListItemText
} from "@material-ui/core";
import { Settings, Close } from "@material-ui/icons";
import språk from "../../Funksjoner/språk";
import { useHistory } from "react-router-dom";
import LayerButton from "../Buttons/LayerButton";
import BackgroundSettings from "./BackgroundSettings";

const FavoriteLayerElement = ({ kartlag, onUpdateLayerProp }) => {
  const [expandedSub, setExpandedSub] = useState(false);
  const history = useHistory();
  if (!kartlag) return null;
  const { kode, kart } = kartlag;
  const handleExpandClick = () => {
    setExpandedSub(!expandedSub);
  };
  return (
    <>
      <ListItem
        button
        onClick={() => {
          history.push(kartlag.url);
        }}
      >
        <ListItemText primary={språk(kartlag.tittel)} />
        <ListItemSecondaryAction style={{ cursor: "pointer" }}>
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
        </ListItemSecondaryAction>
      </ListItem>

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
