import baseMapSelectorImage from "./BaseMapSelectorImage.png";
import { Typography } from "@material-ui/core";
import React from "react";

const BaseMapSelector = props => {
  return (
    <div
      style={{
        bottom: 0,
        borderRadius: 8,
        border: "2px solid white",
        boxShadow: "0px 1px 4px rgba(0, 0, 0, 0.3)",
        height: 75,
        left: 20,
        opacity: 1,
        position: "absolute",
        transform: "translateZ(0)",
        transition:
          "width 0.4s,height 0.4s,opacity 0.6s ease-in,margin-bottom 0.4s",
        width: 75,
        zIndex: 7,
        borderColor: "black",
        backgroundColor: "#474747",
        marginBottom: 20
      }}
    >
      <div
        style={{
          whiteSpace: "normal",
          borderRadius: 6,
          overflow: "hidden",
          position: "absolute",
          bottom: 0,
          left: 0,
          top: 0,
          right: 0,
          zIndex: 0,
          backgroundColor: "#f4f3f0"
        }}
      >
        <button
          style={{
            whiteSpace: "normal",
            background: "transparent",
            border: 0,
            borderRadius: 0,
            listStyle: "none",
            margin: 0,
            outline: 0,
            overflow: "visible",
            padding: 0,
            verticalAlign: "baseline",
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: 1,
            backgroundColor: "rgba(255,255,255,0.01)",
            cursor: "pointer"
          }}
        >
          <div style={{ position: "fixed", top: 54, left: 8, zIndex: 10 }}>
            <Typography style={{ color: "#333" }} variant="caption">
              Kart
            </Typography>
          </div>
          <img
            style={{ objectFit: "cover", height: "100%" }}
            src={baseMapSelectorImage}
          />
        </button>
      </div>
    </div>
  );
};

export default BaseMapSelector;
