import React from "react";
//import EkspandertUnderMeny from "./EkspandertMeny/EkspandertUnderMeny";
//import EkspandertInnhold from "./EkspandertMeny/EkspandertInnhold";
//import EkspanderingsTopplinje from "./EkspanderingsTopplinje";
import {
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
} from "@material-ui/core";
import { VisibilityOutlined, VisibilityOffOutlined } from "@material-ui/icons";
import språk from "../../Funksjoner/språk";
import { useHistory } from "react-router-dom";

const AktivtKartlagElement = ({ kartlag, onUpdateLayerProp }) => {
  const history = useHistory();
  if (!kartlag) return null;
  const kode = kartlag.kode;
  return (
    <ListItem
      button
      onClick={() => {
        history.push(kartlag.url);
      }}
    >
      <ListItemText primary={språk(kartlag.tittel)} />
      <ListItemSecondaryAction
        style={{ cursor: "pointer" }}
        onClick={(e) => {
          onUpdateLayerProp(kode, "erSynlig", !kartlag.erSynlig);
          e.stopPropagation();
        }}
      >
        {kartlag.erSynlig ? (
          <VisibilityOutlined style={{ color: "#777" }} />
        ) : (
          <VisibilityOffOutlined style={{ color: "#777" }} />
        )}
      </ListItemSecondaryAction>
    </ListItem>
    /*
            <li draggable>
        <EkspanderingsTopplinje
          erLokalitet={erLokalitet}
          erAktivtLag={erAktivtLag}
          show_current={show_current}
          handleShowCurrent={handleShowCurrent}
          kartlag={kartlag}
          expanded={expanded}
          setExpanded={setExpanded}
          context={context}
          onUpdateLayerProp={onUpdateLayerProp}
          is_current_object={is_current_object}
        />

        {expanded && (
          <>
            <EkspandertUnderMeny
              erLokalitet={erLokalitet}
              kode={kode}
              context={context}
              bbox={bbox}
              onFitBounds={onFitBounds}
              kartlag={kartlag}
              onRemoveSelectedLayer={onRemoveSelectedLayer}
              is_current_object={is_current_object}
              onUpdateLayerProp={onUpdateLayerProp}
              aktivtFormat={aktivtFormat}
              activateLayerFromHistory={activateLayerFromHistory}
              navhist={navhist}
            />

            <EkspandertInnhold
              kode={kode}
              aktivtFormat={aktivtFormat}
              onUpdateLayerProp={onUpdateLayerProp}
              kartlag={kartlag}
              is_current_object={is_current_object}
            />
          </>
        )}
      </li>
    */
  );
};

export default AktivtKartlagElement;
