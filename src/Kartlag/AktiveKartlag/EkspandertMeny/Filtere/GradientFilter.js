import React from "react";
import SliderElement from "Innstillinger/FerdigeMiniElement/SliderElement";

import { SwapVert } from "@material-ui/icons/";
const GradientFilter = ({ onUpdateLayerProp, kartlag, kode }) => {
  /*
    Legg til: 

    Gi brukeren mulighet til å velge maks og minimum på skalaen uavhengig av om det er en
    kontinuelig eller typeinndelt visning. 
    * For gradientvisning - behold som før.
    * For typeinndelt, filtrer vekk irrelevante typer.

    */
  const current = kartlag.kart.format; // current list of layers
  //const gradient = Object.keys(current)[0];
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
  const spread = 0.015;
  const måleenhet = "";

  function handleUpdateFilter(kode, key, value) {
    onUpdateLayerProp(kode, "kart.format.raster_gradient." + key, value);
  }

  return (
    <>
      {kartlag.kart.format.raster_gradient && (
        <>
          <h3>Gradient Filter:</h3>
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
                if (filterMax <= filterMin + spread)
                  onUpdateLayerProp(
                    kode,
                    "filterMax",
                    Math.min(1.0, filterMin + spread)
                  );
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
                if (filterMax <= filterMin + spread)
                  handleUpdateFilter(
                    kode,
                    "filterMin",
                    Math.max(0.0, filterMax - spread)
                  );
              }}
            />
          </div>
        </>
      )}
    </>
  );
};
export default GradientFilter;
