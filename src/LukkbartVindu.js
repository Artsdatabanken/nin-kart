import React from "react";
import { withRouter } from "react-router";
import { Close, ArrowBack } from "@material-ui/icons";
import { IconButton } from "@material-ui/core";

const LukkbartVindu = ({ history, children }) => {
  return (
    <div>
      <div>
        abcas
        <IconButton>
          <ArrowBack></ArrowBack>
        </IconButton>
        <IconButton>
          <Close></Close>
        </IconButton>
      </div>
      asdf
      {false && children}asdf
    </div>
  );
};

export default withRouter(LukkbartVindu);
