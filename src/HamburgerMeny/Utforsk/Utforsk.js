import Menyelement from "../Menyelement";
import React from "react";
import { Pets, Landscape } from "@material-ui/icons";
import Naturvern from "../Naturvern";

const Utforsk = ({ parent, context, handleHovedMeny }) => {
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
          handleHovedMeny();
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
          handleHovedMeny();
        }}
        icon={<Landscape />}
        primary="Landskap"
      />

      <Menyelement
        onClick={e => {
          the_props.history.push("/Administrativ_grense");
          handleHovedMeny();
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
          handleHovedMeny();
        }}
        icon={<Naturvern />}
        primary="Naturvernområder"
      />

      {false && (
        <Menyelement
          onClick={e => {
            the_props.history.push("/Biota/");
            handleHovedMeny();
          }}
          icon={<Pets />}
          primary="Arter"
        />
      )}
    </>
  );
};

export default Utforsk;
