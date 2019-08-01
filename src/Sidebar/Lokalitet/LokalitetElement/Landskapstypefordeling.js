import React from "react";
import Landskapstype from "./Landskapstype";

const Landskapstypefordeling = ({ onNavigate, data }) => {
  return (
    <>
      <div className="landscape_divisions wrap_padding">
        <h1>Fordeling av landskapstyper</h1>
        <div>
          <div className="image_holder_landscape" />
          <div>
            <ul>
              <li>item 1</li>
              <li>item 2</li>
              <li>item 3</li>
              <li>juster dette med data</li>
            </ul>
          </div>
        </div>
      </div>
      <Landskapstype data={data} onNavigate={onNavigate} />
    </>
  );
};

export default Landskapstypefordeling;
