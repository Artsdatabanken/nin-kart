import React from "react";
import Landskapstype from "./Landskapstype";

function innerLevel(node) {
  // Recursively look up the deepest single child node
  node = node[Object.keys(node)[0]];
  if (!node.values) {
    console.log(node.title);
    return node.title;
  }
  return innerLevel(node.values);
}

const Landskapstypefordeling = ({ onNavigate, data, landskap }) => {
  // if(!landskap )return null;
  // console.log("landskap", landskap);
  console.log(landskap);
  let item = innerLevel(landskap);

  return (
    <>
      <div className="landscape_divisions wrap_padding">
        <h1>Fordeling av landskapstyper</h1>
        <div>
          <div className="image_holder_landscape" />
          <div>
            <ul>
              <li>{item}</li>
            </ul>
          </div>
        </div>
      </div>
      {data && <Landskapstype data={data} onNavigate={onNavigate} />}
    </>
  );
};

export default Landskapstypefordeling;
