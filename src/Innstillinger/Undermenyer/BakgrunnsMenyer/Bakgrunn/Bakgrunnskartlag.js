import {
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Switch
} from "@material-ui/core";
import { default as React } from "react";
import VelgFargeBoks from "Innstillinger/FerdigeMiniElement/VelgFargeBoks";
import tinycolor from "tinycolor2";
import ColorPicker from "Innstillinger/FerdigeMiniElement/ColorPicker";

const Bakgrunnskartlag = ({
  onUpdateLayerProp,
  oppdaterElement,
  tittel,
  erSynlig,
  farge
}) => (
  <ListItem>
    <Switch
      onClick={e => e.stopPropagation()}
      onChange={() => {
        onUpdateLayerProp("bakgrunnskart", oppdaterElement, !erSynlig);
      }}
      checked={erSynlig}
    />

    <ListItemText primary={tittel} />
    <div
      onClick={e => {
        console.log("farge: ", farge);
        onUpdateLayerProp("bakgrunnskart", oppdaterElement + "_farge", "blue");
      }}
    >
      {farge}

      <VelgFargeBoks farge={farge} />
    </div>

    <div className="sidebar_element">
      <h3>Fyllfarge</h3>
      <ColorPicker
        color={farge}
        onChange={farge => {
          const rgbString = tinycolor(farge.rgb).toRgbString();
          onUpdateLayerProp(
            "bakgrunnskart",
            oppdaterElement + "_farge",
            rgbString
          );
        }}
      />
    </div>
  </ListItem>
);

export default Bakgrunnskartlag;
