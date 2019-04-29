import React from "react";
import { withRouter } from "react-router";
import Flis from "../Kodetre/Kodeliste/Flis";
import { KeyboardArrowRight } from "@material-ui/icons";

const ListeLink = ({
  kode,
  primary,
  secondary,
  visKoder,
  onClick,
  new_object
}) => {
  const prefix = kode.substring(0, 2);
  return (
    <button
      className={
        (new_object &&
          "clickable_element_location_header sidebar_element clickable_element_location ") ||
        "sidebar_element clickable_element_location  clickable_element_location_subelement"
      }
      onClick={onClick}
    >
      <div className="text_content">
        <h3>
          {primary}
          {kode && visKoder === true && <span> - </span>}
          {new_object && <span>{prefix}</span>}
          <Flis kode={kode} visKoder={visKoder} />
        </h3>
        {secondary}
      </div>
      <div className="invisible_icon_button element_link">
        <KeyboardArrowRight />
      </div>
    </button>
  );
};

export default withRouter(ListeLink);
