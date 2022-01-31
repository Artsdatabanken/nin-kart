import React, { useState } from "react";
import { withRouter } from "react-router";
import { Close, ArrowBack, DoubleArrow } from "@material-ui/icons";
import { IconButton } from "@material-ui/core";

const LukkbartVindu = ({ tittel, onClose, onBack, children, iconurl }) => {
  const [expanded, setExpanded] = useState(true);

  return (
    <>
      <button
        onClick={e => {
          setExpanded(!expanded);
        }}
        className=""
      >
        Åpne <DoubleArrow />
      </button>
      {expanded && (
        <div className="lukkbartvindu">
          <div className="lukkbartvindu-innhold">
            <button
              onClick={e => {
                setExpanded(!expanded);
              }}
              className="closebutton"
            >
              Lukk <Close />
            </button>
          </div>

          {false && (
            <IconButton onClick={onBack}>
              <ArrowBack></ArrowBack>
            </IconButton>
          )}
          <div className="section">
            <h2 className="lukkbartvindu_header">
              <img src={iconurl} alt="" />
              {tittel}
            </h2>
          </div>

          {true && children}
        </div>
      )}
    </>
  );
};

export default withRouter(LukkbartVindu);
