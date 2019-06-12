import Menyelement from "HamburgerMeny/Menyelement";
import React from "react";
import {
  CloudUpload,
  CloudDownload,
  Comment,
  Panorama,
  Info,
  Pets,
  Landscape,
  Layers,
  AssignmentInd
} from "@material-ui/icons";
import Naturvern from "HamburgerMeny/Naturvern";

const Utforsk = ({ parent }) => (
  <>
    <Menyelement
      onClick={parent.handleClickNatursystem}
      icon={<Panorama />}
      primary="Natursystem"
    />

    <Menyelement
      onClick={parent.handleClickLandskap}
      icon={<Landscape />}
      primary="Landskap"
    />

    <Menyelement
      onClick={parent.handleClickFylke}
      icon={<Layers />}
      primary="Fylke"
    />

    <Menyelement
      onClick={parent.handleClickNaturvernområde}
      icon={<Naturvern />}
      primary="Naturvernområde"
    />

    <Menyelement
      onClick={parent.handleClickArt}
      icon={<Pets />}
      primary="Art"
    />
  </>
);
export default Utforsk;
