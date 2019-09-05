import React from "react";
import SliderElement from "GjenbruksElement/SliderElement";

import { SwapVert } from "@material-ui/icons/";
const GradientFilter = ({ onUpdateLayerProp, kartlag, kode }) => {
  /*
    Legg til: 

    Gi brukeren mulighet til å velge maks og minimum på skalaen uavhengig av om det er en
    kontinuelig eller typeinndelt visning. 
    * For gradientvisning - behold som før.
    * For typeinndelt, filtrer vekk irrelevante typer.

    */
  //const current = kartlag.kart.format; // current list of layers
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
  //const spread = 0.015;
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
                if (v > filterMax) {
                  handleUpdateFilter(
                    kode,
                    "filterMax",
                    v
                    //Math.max(0.0, filterMax - spread)
                  );
                }
                //if (filterMax <= filterMin + spread)

                /*if (filterMax <= filterMin){
                console.log ("Max mindre enn min! Max: " + filterMax, " Min: " + filterMin);
                
                handleUpdateFilter(
                    //onUpdateLayerProp(
                    kode,
                    "filterMax",
                    filterMax
                    //Math.min(1.0, filterMin + spread)
                  );
                }*/
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
                //if (filterMax <= filterMin + spread)
                if (v <= filterMin) {
                  handleUpdateFilter(
                    kode,
                    "filterMin",
                    v
                    //Math.max(0.0, filterMax - spread)
                  );
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

/*
  navnPåUndernivå(kode) {
    const nivåer = typesystem.hentNivaa(kode + "-1");
    if (nivåer.length <= 0) return "underelementer";
    const nivå = nivåer[0];
    return nivå.endsWith("e") ? nivå + "r" : nivå;
  }
 */
