import React from "react";
import LukkbartVindu from "../../LukkbartVindu";
import språk from "../../Funksjoner/språk";
import EkspandertInnhold from "../AktiveKartlag/EkspandertMeny/EkspandertInnhold";
import { InfoOutlined } from "@material-ui/icons";
import { IconButton, Tooltip } from "@material-ui/core";

const Kartlaginnstillinger = ({
  meta,
  onUpdateLayerProp,
  onNavigateToTab,
  onClose
}) => {
  return (
    <LukkbartVindu
      onBack={() => onNavigateToTab("kartlag")}
      onClose={onClose}
      tittel={meta ? "Innstillinger: " + språk(meta.tittel) : "Innstillinger"}
    >
      <div style={{ padding: 8 }}>
        <Tooltip title="Add" aria-label="add">
          <IconButton onClick={() => onNavigateToTab("informasjon")}>
            <InfoOutlined></InfoOutlined>
          </IconButton>
        </Tooltip>
        {meta && (
          <EkspandertInnhold
            onUpdateLayerProp={onUpdateLayerProp}
            meta={meta}
            is_current_object={true}
          />
        )}
      </div>
    </LukkbartVindu>
  );
};

export default Kartlaginnstillinger;
