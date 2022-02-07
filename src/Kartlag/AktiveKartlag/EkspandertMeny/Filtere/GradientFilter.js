import React from "react";
import RangeSlider from "../../../../GjenbruksElement/RangeSlider";

const GradientFilter = ({ onUpdateLayerProp, meta }) => {
  /*
    Gi brukeren mulighet til å velge maks og minimum på skalaen uavhengig av om det er en
    kontinuelig eller typeinndelt visning. 
  */

  const { kode, kart } = meta;
  let gradient;
  let filterMin = 0;
  let filterMax = 100;
  let [rangeMin, rangeMax] = [0, 100];

  if (kart.format.raster_gradient) {
    gradient = kart.format.raster_gradient;
    filterMin = gradient.filterMin;
    filterMax = gradient.filterMax;
    [rangeMin, rangeMax] = gradient.intervall.original;
  } else {
    gradient = kart.format.polygon;
  }

  const step = (rangeMax - rangeMin) / 1000;
  const decimals = Math.trunc(Math.log10(10000 / rangeMax));
  const måleenhet = "";

  return (
    <>
      {kart.format.raster_gradient && (
        <div className="submeny_container">
          Gradient Filter:
          <br />
          <div className="slider_element ">
            <RangeSlider
              minLabel={
                filterMin && filterMin.toFixed(decimals) + " " + måleenhet
              }
              maxLabel={
                filterMax && filterMax.toFixed(decimals) + " " + måleenhet
              }
              min={rangeMin}
              max={rangeMax}
              step={step}
              kode={kode}
              onUpdateLayerProp={onUpdateLayerProp}
            />
          </div>
        </div>
      )}
    </>
  );
};
export default GradientFilter;
