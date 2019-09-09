import React from "react";
import SliderElement from "GjenbruksElement/SliderElement";

import { SwapVert } from "@material-ui/icons/";
const GradientFilter = ({ onUpdateLayerProp, kartlag, kode }) => {
  /*
    Gi brukeren mulighet til å velge maks og minimum på skalaen uavhengig av om det er en
    kontinuelig eller typeinndelt visning. 
  */

  let gradient;
  let filterMin = 0;
  let filterMax = 100;
  let [rangeMin, rangeMax] = [0, 100];

  if (kartlag.kart.format.raster_gradient) {
    gradient = kartlag.kart.format.raster_gradient;
    filterMin = gradient.filterMin;
    filterMax = gradient.filterMax;
    [rangeMin, rangeMax] = gradient.intervall.original;
  } else {
    gradient = kartlag.kart.format.polygon;
  }

  const step = (rangeMax - rangeMin) / 1000;
  const decimals = Math.trunc(Math.log10(10000 / rangeMax));
  //const spread = 0.015;
  const måleenhet = "";

  function handleUpdateFilter(kode, key, value) {
    onUpdateLayerProp(kode, "kart.format.raster_gradient." + key, value);
  }

  return (
    <>
      {kartlag.kart.format.raster_gradient && (
        <>
          <h2>Gradient Filter:</h2>
          <div className="">
            <SliderElement
              value={filterMin}
              decimals={2}
              min={rangeMin}
              max={rangeMax}
              step={step}
              tittel="Minimum"
              undertittel={filterMin.toFixed(decimals) + " " + måleenhet}
              icon={<SwapVert />}
              onChange={v => {
                handleUpdateFilter(kode, "filterMin", v);
                if (v > filterMax) {
                  handleUpdateFilter(kode, "filterMax", v);
                }
              }}
            />

            <SliderElement
              value={filterMax}
              decimals={2}
              min={rangeMin}
              max={rangeMax}
              step={step}
              tittel="Maksimum"
              undertittel={filterMax.toFixed(decimals) + " " + måleenhet}
              icon={<SwapVert />}
              onChange={v => {
                handleUpdateFilter(kode, "filterMax", v);
                if (v <= filterMin) {
                  handleUpdateFilter(kode, "filterMin", v);
                }
              }}
            />
          </div>
        </>
      )}
    </>
  );
};
export default GradientFilter;
