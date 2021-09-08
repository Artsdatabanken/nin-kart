import React, { useState } from "react";
import VelgFargeBoks from "../../FellesElementer/VelgFargeBoks";
import { VisibilityOutlined, VisibilityOffOutlined } from "@material-ui/icons";
import språk from "../../../../../Funksjoner/språk";
import FargeVelger from "../../FellesElementer/FargeVelger";
import {
  IconButton,
  ListItemSecondaryAction,
  ListItemAvatar,
  ListItem,
  ListItemText,
} from "@material-ui/core";

const LegendeElement = ({
  erSynlig,
  tittel,
  koder,
  kode,
  onUpdateLayerProp,
  farge,
  elementType,
}) => {
  const [showColours, setShowColours] = useState(false);

  /* 
  
  I denne filen er alle elementene man redigerer underelementer av det overstående elementet.
  Det vil si at å referere direkte herfra fort kan bli feil.
  Slenger derfor med variabelen "childof"
  
  */

  return (
    <>
      <ListItem
        button
        onClick={(e) => {
          setShowColours(!showColours);
          e.stopPropagation();
        }}
      >
        <ListItemAvatar>
          <IconButton
            onClick={(e) => {
              onUpdateLayerProp(kode, "erSynlig", !erSynlig, elementType);
              e.stopPropagation();
            }}
          >
            {erSynlig ? (
              <VisibilityOutlined />
            ) : (
              <VisibilityOffOutlined style={{ color: "#aaa" }} />
            )}
          </IconButton>
        </ListItemAvatar>
        <ListItemText primary={språk(tittel)} secondary={koder}></ListItemText>
        <ListItemSecondaryAction>
          <VelgFargeBoks farge={farge} kode={kode} tittel={språk(tittel)} />
        </ListItemSecondaryAction>
      </ListItem>

      {showColours && (
        <FargeVelger
          color={farge}
          onUpdateLayerProp={onUpdateLayerProp}
          where={kode}
          elementType={elementType}
        />
      )}
    </>
  );
};

export default LegendeElement;
