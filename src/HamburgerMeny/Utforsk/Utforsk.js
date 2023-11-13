import Menyelement from "../Menyelement";
import React from "react";
import { Pets, Landscape } from "@material-ui/icons";
import Naturvern from "../Naturvern";
import { useNavigate } from "react-router-dom";

const Utforsk = ({onToggleHovedMeny}) => {
  const navigate  = useNavigate();

  const onElementClick = (url) => {
    navigate(url);
    onToggleHovedMeny();
  }

  return (
    <>
      <Menyelement
        onClick={e => {
          onElementClick("/Natur_i_Norge/Natursystem");
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
          onElementClick("/Natur_i_Norge/Landskap");
        }}
        icon={<Landscape />}
        primary="Landskap"
      />

      <Menyelement
        onClick={e => {
          onElementClick("/Administrativ_grense");
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
          onElementClick("/Naturvernområde/");
        }}
        icon={<Naturvern />}
        primary="Naturvernområder"
      />

      {false && (
        <Menyelement
          onClick={e => {
            onElementClick("/Biota/");
          }}
          icon={<Pets />}
          primary="Arter"
        />
      )}
    </>
  );
}

export default Utforsk;
