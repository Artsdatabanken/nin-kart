import React from "react";
import { withRouter } from "react-router";
import { Close, ArrowBack } from "@material-ui/icons";
import { IconButton } from "@material-ui/core";

const LukkbartVindu = ({ tittel, onClose, onBack, children }) => {
  return (
    <div
      style={{
        backgroundColor: "#eee",
        position: "absolute",
        overflowY: "auto",
        boxShadow:
          "0px 5px 5px -3px rgba(0,0,0,0.2),0px 8px 10px 1px rgba(0,0,0,0.14),0px 3px 14px 2px rgba(0,0,0,0.12)",
        top: 48,
        bottom: 0,
        width: 408,
        left: 0,
      }}
    >
      <div style={{ display: "flex", paddingTop: 8, marginLeft: 16 }}>
        {false && (
          <IconButton onClick={onBack}>
            <ArrowBack></ArrowBack>
          </IconButton>
        )}
        <span
          style={{
            width: 320,
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
            overflow: "hidden",
            _lineHeight: "32px",
            marginTop: 14,
            color: "rgba(0, 0, 0, 0.54)",
            fontSize: 18,
            fontWeight: 500,
          }}
        >
          {tittel}
        </span>
        <IconButton onClick={onClose}>
          <Close></Close>
        </IconButton>
      </div>
      {true && children}
    </div>
  );
};

export default withRouter(LukkbartVindu);
