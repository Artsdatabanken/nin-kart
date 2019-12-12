import { ExpandLess, ExpandMore } from "@material-ui/icons";
import React, { useState } from "react";
import språk from "Funksjoner/språk";
import { VisibilityOutlined, VisibilityOffOutlined } from "@material-ui/icons";
import {
  Typography,
  Slider,
  IconButton,
  ListSubheader,
  Collapse,
  ListItem,
  ListItemText,
  Checkbox,
  ListItemIcon
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

          {false && (
            <Checkbox
              checked={erSynlig}
              onChange={e => {
                if (!erAktivtLag) {
                  onUpdateLayerProp(kode, "erSynlig", !erSynlig);
                  e.stopPropagation();
                } else {
                  handleShowCurrent(!show_current);
                }
              }}
              value="checkedA"
              inputProps={{
                "aria-label": "primary checkbox"
              }}
            />
          )}
        </ListItemIcon>
        <ListItemText primary={språk(tittel)} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <div
          style={{
            backgroundColor: "white",
            paddingLeft: 16,
            paddingBottom: 16,
            paddingRight: 16,
            paddingTop: 16
          }}
        >
          {kartlag.kart.format.wms && (
            <>
              <Typography id="range-slider" gutterBottom>
                Gjennomsiktighet
              </Typography>
              <Slider
                value={100 * kartlag.opacity}
                step={1}
                min={0}
                max={100}
                onChange={(e, v) =>
                  onUpdateLayerProp(kode, "opacity", v / 100.0)
                }
                valueLabelDisplay="auto"
                aria-labelledby="range-slider"
                getAriaValueText={opacity => opacity + " %"}
              />
              {hasLegend && (
                <>
                  <Typography id="range-slider" gutterBottom>
                    Tegnforklaring
                  </Typography>
                  <div style={{ paddingLeft: 24 }}>
                    <img
                      onError={() => setHasLegend(false)}
                      src={`${kartlag.kart.format.wms.url}?layer=${kartlag.kart.format.wms.layer}&request=GetLegendGraphic&format=image/png&version=1.3.0`}
                    />
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </Collapse>
    </>
  );
};

export default ForvaltningsEkspanderTopp;
