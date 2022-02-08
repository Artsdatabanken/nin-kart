import React, { useState } from "react";
import { withRouter } from "react-router";
import { Close, ArrowBack } from "@material-ui/icons";
import { IconButton } from "@material-ui/core";

const LukkbartVindu = ({
  tittel,
  onClose,
  onBack,
  children,
  icon,
  show,
  toplayer
}) => {
  const [expanded, setExpanded] = useState(show);

  if (show !== undefined && show !== expanded) {
    // IF we have show and onCLose, use these.
    // If not use those in this component instead.
    // Sometimes it needs to be set higher to be availiable from map
    setExpanded(show);
  }

  function handleExpand(value) {
    if (show !== undefined) {
      onClose(value);
    } else {
      setExpanded(value);
    }
  }

  return (
    <>
      {(expanded || show) && (
        <div className={toplayer ? "lukkbartvindu toplayer" : "lukkbartvindu"}>
          <div className="lukkbartvindu-innhold">
            <button
              onClick={e => {
                handleExpand(false);
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
              {icon}
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
