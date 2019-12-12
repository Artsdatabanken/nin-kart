import Geonorge from "./Geonorge";
import { ExpandLess, ExpandMore } from "@material-ui/icons";
import React, { useState } from "react";
import språk from "Funksjoner/språk";
import {
  OpenInNew,
  VisibilityOutlined,
  VisibilityOffOutlined
} from "@material-ui/icons";
import {
  Typography,
  Slider,
  IconButton,
  ListItemIcon,
  Collapse,
  ListItem,
  ListItemText
} from "@material-ui/core";

const ForvaltningsEkspanderTopp = ({
  kartlag,
  erAktivtLag,
  onUpdateLayerProp,
  handleShowCurrent,
  show_current
}) => {
  let tittel = kartlag.tittel;
  const kode = kartlag.kode;
  const erSynlig = kartlag.erSynlig;

  const [open, setOpen] = useState(false);
  const [hasLegend, setHasLegend] = useState(true);
  return (
    <>
      <ListItem
        style={{ backgroundColor: open ? "#fff" : "#eee" }}
        button
        onClick={() => {
          setOpen(!open);
        }}
      >
        <ListItemIcon onClick={e => e.stopPropagation()}>
          <IconButton
            onClick={e => {
              if (!erAktivtLag) {
                onUpdateLayerProp(kode, "erSynlig", !erSynlig);
                e.stopPropagation();
              } else {
                handleShowCurrent(!show_current);
              }
            }}
          >
            {erSynlig ? (
              <VisibilityOutlined style={{ color: "#333" }} />
            ) : (
              <VisibilityOffOutlined style={{ color: "#aaa" }} />
            )}
          </IconButton>
        </ListItemIcon>
        <ListItemText primary={språk(tittel)} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <div
          style={{
            backgroundColor: open ? "#fff" : "#eee",
            paddingLeft: 16,
            paddingBottom: 16,
            paddingRight: 16,
            paddingTop: 16
          }}
        >
          {kartlag.kart.format.wms && (
            <div style={{ marginLeft: 24 }}>
              <Typography id="range-slider" gutterBottom>
                Gjennomsiktighet
              </Typography>
              <Slider
                value={100 * kartlag.opacity}
                step={1}
                min={0}
                max={100}
                onChange={(e, v) => {
                  onUpdateLayerProp(kode, "opacity", v / 100.0);
                }}
                valueLabelDisplay="auto"
                aria-labelledby="range-slider"
                getAriaValueText={opacity => opacity + " %"}
              />
              {true && (
                <ListItem
                  style={{ backgroundColor: open ? "#fff" : "#eee" }}
                  button
                  onClick={e => {
                    window.open(kartlag.geonorge || "https://www.geonorge.no/");
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                >
                  <ListItemIcon>
                    <Geonorge />
                  </ListItemIcon>
                  <ListItemText primary="Datasettet på Geonorge.no" />
                  <OpenInNew />
                </ListItem>
              )}

              {hasLegend && (
                <>
                  <Typography id="range-slider" gutterBottom>
                    Tegnforklaring
                  </Typography>
                  <div style={{ paddingLeft: 56 }}>
                    <img
                      alt="legend"
                      onError={() => setHasLegend(false)}
                      src={`${kartlag.kart.format.wms.url}?layer=${kartlag.kart.format.wms.layer}&request=GetLegendGraphic&format=image/png&version=1.3.0`}
                    />
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </Collapse>
    </>
  );
};

export default ForvaltningsEkspanderTopp;
