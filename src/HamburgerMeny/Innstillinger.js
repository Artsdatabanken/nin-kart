import Menyelement from "./Menyelement";
import { Language, SortByAlpha } from "@material-ui/icons";
import React from "react";

const Innstillinger = ({
  visKoder,
  sorterPåKode,
  onUpdateSetting,
  spraak,
  handleSpraak,
}) => {
  let spraaknavn = "";
  if (spraak === "en") {
    spraaknavn = "Engelsk";
  } else if (spraak === "nb") {
    spraaknavn = "Norsk bokmål";
  } else if (spraak === "nn") {
    spraaknavn = "Nynorsk";
  } else if (spraak === "sn") {
    spraaknavn = "Vitenskapelig navn";
  }

  return (
    <>
      <Menyelement
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onUpdateSetting("visKoder", !visKoder);
        }}
        icon={<span>NA</span>}
        primary={visKoder ? "Vis NiN-koder" : "Ikke vis NiN-koder"}
        checked={visKoder}
      />

      <Menyelement
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onUpdateSetting("sorterPåKode", !sorterPåKode);
        }}
        icon={<SortByAlpha />}
        primary={"Sorter lister etter " + (sorterPåKode ? "koder" : "navn")}
      />

      <Menyelement
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          const språk = ["en", "nb", "nn"];
          const språkIndex = språk.indexOf(spraak);
          handleSpraak(språk[(språkIndex + 1) % språk.length]);
        }}
        icon={<Language />}
        primary={spraaknavn}
      />
    </>
  );
};

export default Innstillinger;
