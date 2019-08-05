import React from "react";
import Landskapstype from "./Landskapstype";
//import {  Landscape } from "@material-ui/icons";

/*
function innerLevel(node) {
  // Recursively look up the deepest single child node
  node = node[Object.keys(node)[0]];
  if (!node.values) {
    //console.log(node.title);
    return node;
  }
  return innerLevel(node.values);
}
*/

const Landskapstypefordeling = ({
  onNavigate,
  data,
  gammelLandskap,
  landskap
}) => {
  //let item = innerLevel(gammelLandskap);

  return (
    <>
      <div className="landscape_divisions wrap_padding">
        <h1>
          {/*Fordeling av landskapstyper*/}
          Landskapstype
        </h1>

        <div className="landscape_wrap_2ndlayer">
          <p>
            En landskapstype er en samling av variasjoner i terreng og
            landeformer som sammen påvirker et større område. I kartleggingen er
            den minste graden som måles på en kvadratkilometer. Man kan dermed
            befinne deg i et isbrelandskap uten å være akkurat på en isbre. Det
            vil også kunne være noen små variasjoner som ikke bestemmer
            landskapstypen da de er små og derav ikke dominerende.
          </p>

          {/*
          <div 
         // className="image_holder_landscape"
           > <Landscape /></div>

          <div onClick={() => {
            onNavigate(landskap.url);
          }} >
            {landskap.tittel_kort}...
            </div>
          */}

          {data && (
            <Landskapstype
              data={data}
              onNavigate={onNavigate}
              newlandskap={landskap}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Landskapstypefordeling;
