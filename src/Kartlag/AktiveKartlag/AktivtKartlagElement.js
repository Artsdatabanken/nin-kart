import React, { useState } from "react";
import TemaMeny from "./EkspandertMeny/Visualisering/TemaMeny/TemaMeny";
import {
  ListItem,
  ListItemSecondaryAction,
  ListItemText
} from "@material-ui/core";
import { VisibilityOutlined, VisibilityOffOutlined } from "@material-ui/icons";
import språk from "../../Funksjoner/språk";
import { useHistory } from "react-router-dom";

import ArrowButton from "../../GjenbruksElement/ArrowButton";

const AktivtKartlagElement = ({ kartlag, onUpdateLayerProp }) => {
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
          <button
            className="kartlag_element_buttons"
            onClick={e => {
              onUpdateLayerProp(kode, "erSynlig", !kartlag.erSynlig);
              e.stopPropagation();
            }}
          >
            {kartlag.erSynlig ? (
              <VisibilityOutlined style={{ color: "#777" }} />
            ) : (
              <VisibilityOffOutlined style={{ color: "#777" }} />
            )}
          </button>

          <ArrowButton
            className="kartlag_element_buttons"
            handleExpandClick={handleExpandClick}
            expanded={expandedSub}
          />
        </ListItemSecondaryAction>
      </ListItem>

      {expandedSub && (
        <div className="subsection">
          <h4>Innstillinger</h4>
          {kode === "bakgrunnskart" && (
            <TemaMeny
              onUpdateLayerProp={onUpdateLayerProp}
              aktivtFormat={kart.aktivtFormat}
            />
          )}
        </div>
      )}
    </>
  );
};

export default AktivtKartlagElement;
