import React, { useState } from "react";
import { withRouter } from "./withRouter";
import { Close, ArrowBack } from "@material-ui/icons";
import { IconButton } from "@material-ui/core";

const LukkbartVindu = ({
  tittel,
  onClose,
  onBack,
  children,
  icon,
  show,
  toplayer,
  punktIsTopLayer
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

  let className = "lukkbartvindu";
  if (toplayer) {
    className += " toplayer";
  }
  if (punktIsTopLayer) {
    className += " punktIsTopLayer";
  }

  return (
    <>
      {(expanded || show) && (
        <div className={className}>
          <div className="lukkbartvindu-innhold">
            <button
              onClick={e => {
                handleExpand(false);
              }}
              className="closetab show-kartlag-button layerbutton "
            >
              <Close />
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
