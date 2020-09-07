import React, { Component } from "react";
import Geografi from "./Lokalitet/LokalitetElement/Geografi";
import Landskap from "./Landskap";
import Naturvernområde from "./Lokalitet/LokalitetElement/Naturvernområde";
import Naturtype from "./Lokalitet/LokalitetElement/Naturtype";
import Beskrivelsessystem from "./Lokalitet/LokalitetElement/Beskrivelsessystem";
import { IconButton, Typography } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import { getKoordinatStreng } from "../koordinater";

class Punkt extends Component {
  render() {
    const { aktivTab, onNavigate, onClosePunkt, punkt } = this.props;
    const { lat, lng } = punkt;
    if (!lat) return null;
    const { fylke, kommune, sted, landskap, vektor } = punkt;
    const nat = (vektor || []).find((e) => e && e.datasettkode === "NAT");
    return (
      <>
        <div
          className={
            (aktivTab === "informasjon" ? "mobile_on" : "mobile_off") +
            " main_bodyx"
          }
        >
          <Typography
            variant="h5"
            style={{ fontWeight: "bold", color: "#777", margin: 8 }}
          >
            Punkt
          </Typography>
          <Typography variant="subtitle1" style={{ margin: 8 }}>
            {getKoordinatStreng([lng, lat])}
          </Typography>
          <IconButton
            style={{ position: "absolute", right: 8, top: 0 }}
            onClick={onClosePunkt}
          >
            <Close></Close>
          </IconButton>
          <Geografi
            sted={sted}
            fylke={fylke}
            kommune={kommune}
            lat={lat}
            lng={lng}
            onNavigate={onNavigate}
          />
          {vektor &&
            vektor.map((v) => {
              if (v.datasettkode === "VV ")
                return <Naturvernområde key={v.id} {...v} />;
              return null;
            })}
          {nat && (
            <>
              <Naturtype {...nat} onNavigate={onNavigate} />
              <Beskrivelsessystem variabler={nat.variabel} />
            </>
          )}
          <Landskap landskap={landskap} />
        </div>
      </>
    );
  }
}

export default Punkt;
