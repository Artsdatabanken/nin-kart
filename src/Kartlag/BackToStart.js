import React from "react";
import { ArrowBack } from "@material-ui/icons";
const BackToStart = ({ isstartpage, onNavigate }) => {
  if (isstartpage) return null;

  return (
    <div className="section">
      <button
        className="kartlag_element_backbutton"
        onClick={() => {
          onNavigate("/kart");
        }}
      >
        <div className="backicon">
          <ArrowBack />
        </div>
        <span className="kartlag_element_text">Tilbake til start</span>
      </button>
    </div>
  );
};

export default BackToStart;
