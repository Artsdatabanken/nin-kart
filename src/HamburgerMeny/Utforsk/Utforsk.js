import Menyelement from "HamburgerMeny/Menyelement";
import React from "react";
import { Pets, Landscape } from "@material-ui/icons";
import Naturvern from "HamburgerMeny/Naturvern";

const Utforsk = ({ parent, context }) => {
  /*
  Ridiculous check here to avoid props collapse when called from different places
  */
  let the_props = parent;
  if (!parent.history) {
    the_props = parent.props;
  }
  function onToggleHovedmeny() {
    if (context) {
      context.onToggleHovedmeny();
    }
  }

  return (
    <>
      <Menyelement
        onClick={e => {
          the_props.history.push("/Natur_i_Norge/Natursystem");
          onToggleHovedmeny();
        }}
        icon={
          <img
            className="meny_ikon_image"
            src="/logoer/natursystem_ikon.png"
            alt=""
          />
        }
        primary="Natursystem"
      />

      <Menyelement
        onClick={e => {
          the_props.history.push("/Natur_i_Norge/Landskap");
          onToggleHovedmeny();
        }}
        icon={<Landscape />}
        primary="Landskap"
      />

      <Menyelement
        onClick={e => {
          the_props.history.push("/Administrativ_grense/");
          onToggleHovedmeny();
        }}
        icon={
          <img
            className="meny_ikon_image"
            src="/logoer/fylke_ikon.png"
            alt=""
          />
        }
        primary="Administrative grenser"
      />

      <Menyelement
        onClick={e => {
          the_props.history.push("/Naturvernområde/");
          onToggleHovedmeny();
        }}
        icon={<Naturvern />}
        primary="Naturvernområder"
      />

      <Menyelement
        onClick={e => {
          the_props.history.push("/Biota/");
          onToggleHovedmeny();
        }}
        icon={<Pets />}
        primary="Arter"
      />
    </>
  );
};

export default Utforsk;
