import React from "react";
import "style/Forvaltningsportalen.css";

const Forvaltningsportalen = props => {
  return (
    <div className="forvaltningsportalen frontpage_header">
      <div
        onClick={e => {
          props.history.push("/forvaltningsportalen");
        }}
      >
        <h1>Forvaltningsportalen</h1>
        <h2>En kartløsning for KLD</h2>
      </div>
    </div>
  );
};

export default Forvaltningsportalen;
