import Menyelement from "../Menyelement";
import React, { Component } from "react";
import { Pets, Landscape } from "@material-ui/icons";
import Naturvern from "../Naturvern";

class Utforsk extends Component {
  render() {
    const { parent, context, handleHovedMeny } = this.props;
    let the_props = parent;
    if (parent != undefined && !parent.history) {
      the_props = parent.props;
    }

    function onElementClick(url) {
      the_props.history.push(url);
      handleHovedMeny();
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
}

export default Utforsk;
