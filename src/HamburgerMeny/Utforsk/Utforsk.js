import Menyelement from "HamburgerMeny/Menyelement";
import React from "react";
import { Panorama, Pets, Landscape, Layers } from "@material-ui/icons";
import Naturvern from "HamburgerMeny/Naturvern";

const Utforsk = ({ parent }) => {
  /* 
  Ridiculous check here to avoid props collapse when called from different places
  */
  let the_props = parent;
  if (!parent.history) {
    the_props = parent.props;
  }

  return (
    <>
      <Menyelement
        onClick={e => {
          the_props.history.push("/Natur_i_Norge/Natursystem");
        }}
        icon={<Panorama />}
        primary="Natursystem"
      />

      <Menyelement
        onClick={e => {
          the_props.history.push("/Natur_i_Norge/Landskap");
        }}
        icon={<Landscape />}
        primary="Landskap"
      />

      <Menyelement
        onClick={e => {
          the_props.history.push("/Fylke/");
        }}
        icon={<Layers />}
        primary="Fylke"
      />

      <Menyelement
        onClick={e => {
          the_props.history.push("/Naturvernområde/");
        }}
        icon={<Naturvern />}
        primary="Naturvernområde"
      />

      <Menyelement
        onClick={e => {
          the_props.history.push("/Biota/");
        }}
        icon={<Pets />}
        primary="Art"
      />
    </>
  );
};

export default Utforsk;
