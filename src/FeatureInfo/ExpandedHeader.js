import {
  OpenInNew,
  VisibilityOutlined,
  VisibilityOffOutlined
} from "@material-ui/icons";
import {
  IconButton,
  Typography,
  Slider,
  ListSubheader
} from "@material-ui/core";
import React from "react";

const ExpandedHeader = props => {
  return (
    <div style={{ float: "left", marginLeft: 56 }}>
      <IconButton
        onClick={e => {
          if (props.onUpdateLayerProp)
            props.onUpdateLayerProp(props.kode, "erSynlig", !props.erSynlig);
          e.stopPropagation();
        }}
      >
        {props.erSynlig ? (
          <VisibilityOutlined style={{ color: "#333" }} />
        ) : (
          <VisibilityOffOutlined style={{ color: "#aaa" }} />
        )}
      </IconButton>
      <div style={{ float: "right" }}>
        <div style={{ position: "relative" }}>
          <Typography id="range-slider" gutterBottom variant="caption">
            Gjennomsiktighet
          </Typography>
        </div>
        <Slider
          disabled={!props.erSynlig}
          style={{ width: 240, marginLeft: 4, marginTop: 0 }}
          value={100 * props.opacity}
          step={1}
          min={0}
          max={100}
          onChange={(e, v) =>
            props.onUpdateLayerProp &&
            props.onUpdateLayerProp(props.kode, "opacity", v / 100.0)
          }
          valueLabelDisplay="auto"
          aria-labelledby="range-slider"
          getAriaValueText={opacity => opacity + " %"}
        />
      </div>
      <ListSubheader>
        Faktaark{" "}
        {props.url && (
          <IconButton onClick={() => window.open(props.url)}>
            <OpenInNew></OpenInNew>
          </IconButton>
        )}
      </ListSubheader>
    </div>
  );
};

export default ExpandedHeader;
