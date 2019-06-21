import Menyelement from "HamburgerMeny/Menyelement";
import React from "react";
import { Panorama, Pets, Landscape, Layers } from "@material-ui/icons";
import Naturvern from "HamburgerMeny/Naturvern";

const Utforsk = ({ parent, context }) => {
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
          context.onToggleHovedmeny();
        }}
        icon={<Panorama />}
        primary="Natursystem"
      />

      <Menyelement
        onClick={e => {
          the_props.history.push("/Natur_i_Norge/Landskap");
          context.onToggleHovedmeny();
        }}
        icon={<Landscape />}
        primary="Landskap"
      />

      <Menyelement
        onClick={e => {
          the_props.history.push("/Fylke/");
          context.onToggleHovedmeny();
        }}
        icon={<Layers />}
        primary="Fylke"
      />

      <Menyelement
        onClick={e => {
          the_props.history.push("/Naturvernområde/");
          context.onToggleHovedmeny();
        }}
        icon={<Naturvern />}
        primary="Naturvernområde"
      />

      <Menyelement
        onClick={e => {
          the_props.history.push("/Biota/");
          context.onToggleHovedmeny();
        }}
        icon={<Pets />}
        primary="Art"
      />
    </>
  );
};

export default Utforsk;
