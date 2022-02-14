import React, { useState } from "react";
import TemaMeny from "./EkspandertMeny/Visualisering/TemaMeny/TemaMeny";
import BakgrunnInnstillinger from "./EkspandertMeny/Visualisering/BgInnstillinger/BakgrunnInnstillinger";
import FargeVelger from "./EkspandertMeny/FellesElementer/FargeVelger";
import HideLayerButton from "../Buttons/HideLayerButton";
import {
  ListItem,
  ListItemSecondaryAction,
  ListItemText
} from "@material-ui/core";
import {
  VisibilityOutlined,
  VisibilityOffOutlined,
  Settings,
  Close
} from "@material-ui/icons";
import språk from "../../Funksjoner/språk";
import { useHistory } from "react-router-dom";
import SectionExpand from "../../GjenbruksElement/SectionExpand";
import LayerButton from "../Buttons/LayerButton";

const AktivtKartlagElement = ({ kartlag, onUpdateLayerProp }) => {
  const [expandedSub, setExpandedSub] = useState(false);
  const history = useHistory();
  if (!kartlag) return null;
  const { kode, kart } = kartlag;
  const handleExpandClick = () => {
    setExpandedSub(!expandedSub);
  };
  const currentmap = kart.aktivtFormat;
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
          <LayerButton
            icon={
              kartlag.erSynlig ? (
                <VisibilityOutlined />
              ) : (
                <VisibilityOffOutlined />
              )
            }
            onClick={e => {
              onUpdateLayerProp(kode, "erSynlig", !kartlag.erSynlig);
              e.stopPropagation();
            }}
            title={"Vis/Skjul"}
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
        </ListItemSecondaryAction>
      </ListItem>

      {expandedSub && (
        <div className="subsection subexpand">
          <h4>Innstillinger</h4>
          {kode === "bakgrunnskart" && (
            <>
              <TemaMeny
                onUpdateLayerProp={onUpdateLayerProp}
                aktivtFormat={currentmap}
              />

              {currentmap === "google_hybrid" ||
              currentmap === "topo4" ||
              currentmap === "google_satellite" ? (
                <SectionExpand title={"Fargefilter"}>
                  <FargeVelger
                    color={kart.format[currentmap].tint}
                    onUpdateLayerProp={onUpdateLayerProp}
                    where={kode}
                    what={"kart.format." + currentmap + ".tint"}
                    title={"Velg fargetone for kartbladet"}
                  />
                </SectionExpand>
              ) : (
                <SectionExpand title={"Bakgrunnsinstillinger"}>
                  <BakgrunnInnstillinger
                    onUpdateLayerProp={onUpdateLayerProp}
                    aktivtFormat={kart}
                  />
                </SectionExpand>
              )}
            </>
          )}
        </div>
      )}
    </>
  );
};

export default AktivtKartlagElement;
