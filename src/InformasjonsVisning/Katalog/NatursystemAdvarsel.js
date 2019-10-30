import React from "react";

const NatursystemAdvarsel = ({ kode }) => {
  if (kode.indexOf("NN-NA-TI") !== 0) return null;
  return (
    <div className="page_warning">
      <h2>Skjulte kartlag</h2>
      Miljødirektoratet jobber for tiden med kvalitetssikring av data fra
      natursystemkartlegging. Kartdata er derfor ikke tilgjengelig, men
      beskrivelser er tilgjengelige i informasjonsfanen. Dataleveranse forventes
      innen utgangen av 2019.
    </div>
  );
};
export default NatursystemAdvarsel;
