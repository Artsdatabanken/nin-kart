import React from "react";
import SliderElement from "Innstillinger/FerdigeMiniElement/SliderElement";

import { SwapVert } from "@material-ui/icons/";
const Gradient = ({ onUpdateLayerProp, kartlag, kode }) => {
  /*
    Legg til: 

    Gi brukeren mulighet til å velge maks og minimum på skalaen uavhengig av om det er en
    kontinuelig eller typeinndelt visning. 
    * For gradientvisning - behold som før.
    * For typeinndelt, filtrer vekk irrelevante typer.

    */
  const gradient = kartlag.kart.format.raster_gradient;
  const { filterMin, filterMax } = gradient;
  const [rangeMin, rangeMax] = gradient.intervall.original;
  const step = (rangeMax - rangeMin) / 1000;
  const decimals = Math.trunc(Math.log10(10000 / rangeMax));
  const spread = 0.015;
  const måleenhet = "";

  function handleUpdateFilter(kode, key, value) {
    onUpdateLayerProp(kode, "kart.format.raster_gradient." + key, value);
  }

  return (
    <>
      <h3>Gradient Filter:</h3>

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
    </>
  );
};
export default Gradient;
