import React from "react";
import { withRouter } from "react-router";
import Flis from "./Flis";
import { KeyboardArrowRight } from "@material-ui/icons";

const LokalitetLenkeElement = ({
  kode,
  primary,
  secondary,
  visKoder,
  onClick,
  new_object
}) => {
  const prefix = kode.substring(0, 2);

  return (
    <button className="katalog_link_displayer" onClick={onClick}>
      <h3>
        {primary}
        {kode && visKoder === true && (
          <>
            <span> - {new_object && <span>{prefix}</span>}</span>
            <Flis kode={kode} visKoder={visKoder} />
          </>
        )}
      </h3>

      <div className="secondary">{secondary}</div>

      <div className="invisible_icon_button element_link">
        <KeyboardArrowRight />
      </div>
    </button>
  );
};

export default withRouter(LokalitetLenkeElement);
