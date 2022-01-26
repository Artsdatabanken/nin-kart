import React from "react";
import { withRouter } from "react-router";
import { Close, ArrowBack } from "@material-ui/icons";
import { IconButton } from "@material-ui/core";

const LukkbartVindu = ({ tittel, onClose, onBack, children, iconurl }) => {
  return (
    <div className="lukkbartvindu">
      <div class="lukkbartvindu-innhold">
        <button onClick={onClose} className="closebutton">
          Lukk <Close></Close>
        </button>
      </div>

      {false && (
        <IconButton onClick={onBack}>
          <ArrowBack></ArrowBack>
        </IconButton>
      )}
      <h2 className="lukkbartvindu_header">
        <img src={iconurl} />
        {tittel}
      </h2>

      {true && children}
    </div>
  );
};

export default withRouter(LukkbartVindu);
