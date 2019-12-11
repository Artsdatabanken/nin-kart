import { ExpandLess, ExpandMore } from "@material-ui/icons";
import React, { useState } from "react";
import språk from "Funksjoner/språk";
import {
  Collapse,
  ListSubheader,
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
  console.log(kartlag);
  let tittel = kartlag.tittel;
  const kode = kartlag.kode;
  const erSynlig = kartlag.erSynlig;

  const [open, setOpen] = useState(false);
  return (
    <>
      <ListItem
        button
        onClick={() => {
          setOpen(!open);
        }}
      >
        <ListItemIcon>
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
        </ListItemIcon>
        <ListItemText primary={språk(tittel)} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <div
          style={{
            backgroundColor: "white",
            paddingLeft: 16,
            paddingBottom: 16
          }}
        >
          {kartlag.kart.format.wms && (
            <>
              <ListSubheader>Tegneregler</ListSubheader>
              <div style={{ paddingLeft: 24 }}>
                <img
                  src={`${kartlag.kart.format.wms.url}?layer=${kartlag.kart.format.wms.layer}&request=GetLegendGraphic&format=image/png&version=1.1.0`}
                />
              </div>
            </>
          )}
        </div>
      </Collapse>
    </>
  );
};

export default ForvaltningsEkspanderTopp;
