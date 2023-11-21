import React from "react";
import { Language, SortByAlpha } from "@material-ui/icons";
import Menyelement from "./Menyelement";
import constants from "../constants";
import ToggleSwitch from "../GjenbruksElement/ToggleSwitch";

const Innstillinger = ({
  visKoder,
  sorterPåKode,
  onUpdateSetting,
  spraak,
  handleSpraak
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
        onClick={e => {
          e.preventDefault();
          e.stopPropagation();
          onUpdateSetting(constants.showNinCodes, !visKoder);
        }}
        icon={<span>NA</span>}
        primary={constants.showNinCodesText}
        secondary={<ToggleSwitch isActive={visKoder} id="showNinCodes" />}
        checked={visKoder}
      />

      <Menyelement
        onClick={e => {
          e.preventDefault();
          e.stopPropagation();
          onUpdateSetting("sorterPåKode", !sorterPåKode);
        }}
        icon={<SortByAlpha />}
        primary={"Sorter lister etter " + (sorterPåKode ? "koder" : "navn")}
      />

      <Menyelement
        onClick={e => {
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
