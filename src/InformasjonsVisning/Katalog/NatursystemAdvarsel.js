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
      Miljødirektoratet jobber for tiden med kvalitetssikring av data fra
      natursystemkartlgging. Kartdata er derfor ikke tilgjengelig, men
      beskrivelser er tilgjengelige i informasjonsfanen. Dataleveranse forventes
      innen utgangen av 2019.
    </div>
  );
};
export default NatursystemAdvarsel;
