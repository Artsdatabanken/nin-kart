import React from "react";

const NatursystemAdvarsel = ({ kode }) => {
  let natursystem = kode.substring(0, 5) === "NN-NA" || false;
  if (
    kode.substring(0, 12) === "NN-NA-BS-6SO" ||
    kode.substring(0, 9) === "NA-BS-6SO" ||
    kode.substring(0, 12) === "NN-NA-BS-6SE" ||
    kode.substring(0, 9) === "NA-BS-6SE"
  ) {
    natursystem = false;
  }
  if (natursystem === false) return null;
  return (
    <div className="page_warning">
      <h2>Skjulte kartlag</h2>
      Miljødirektoratet jobber for tiden kvalitetssikring av kartene for
      natursystem. Kartene er derfor midlertidig skjult, men beskrivelsene er
      tilgjengelige i informasjonsfanen. Håpet er dataleveranser i oktober og
      mot utgangen av 2019.
    </div>
  );
};
export default NatursystemAdvarsel;
