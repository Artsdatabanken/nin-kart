import React from "react";
import { withRouter } from "react-router";
import Flis from "../Kodetre/Kodeliste/Flis";
import { KeyboardArrowRight } from "@material-ui/icons";

const Listeelement = ({ kode, primary, secondary, visKoder, onClick }) => {
  const prefix = kode.substring(0, 2);
  // This function returns an element
  return (
    <button
      className="sidebar_element clickable_element_location"
      onClick={onClick}
    >
      <div className="text_content">
        <h3>
          {prefix} - {primary} <Flis kode={kode} visKoder={visKoder} />
        </h3>
        {secondary}
      </div>

      <button className="invisible_icon_button element_link">
        <KeyboardArrowRight />
      </button>
    </button>
  );
};

export default withRouter(Listeelement);
