import React, { Component } from "react";
import Geografi from "./Lokalitet/LokalitetElement/Geografi";
import Landskap from "./Landskap";
import Naturvernområde from "./Lokalitet/LokalitetElement/Naturvernområde";
import Naturtype from "./Lokalitet/LokalitetElement/Naturtype";
import Beskrivelsessystem from "./Lokalitet/LokalitetElement/Beskrivelsessystem";
import { IconButton, Typography } from "@material-ui/core";
import { Close } from "@material-ui/icons";

class Punkt extends Component {
  render() {
    const { aktivTab, onNavigate, onClosePunkt, punkt } = this.props;
    const { lat, lng } = punkt;
    if (!lat) return null;
    const { fylke, kommune, sted, landskap, vektor } = punkt;
    const nat =
      Array.isArray(vektor) &&
      vektor.find((e) => e && e.datasettkode === "NAT");
    return (
      <>
        <div
          className={aktivTab === "informasjon" ? "mobile_on" : "mobile_off"}
        >
          <div
            style={{
              backgroundColor: "#eee",
              position: "absolute",
              overflowY: "auto",
              boxShadow:
                "0px 5px 5px -3px rgba(0,0,0,0.2),0px 8px 10px 1px rgba(0,0,0,0.14),0px 3px 14px 2px rgba(0,0,0,0.12)",
              top: 56,
              bottom: 0,
              width: 408,
              right: 0,
            }}
          >
            <Typography
              variant="h5"
              style={{ fontWeight: "bold", color: "#777", margin: 8 }}
            >
              Punkt
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
            {Array.isArray(vektor) &&
              vektor.map((v) => {
                if (v.datasettkode === "VV ")
                  return (
                    <Naturvernområde
                      key={v.id}
                      {...v}
                      onNavigate={onNavigate}
                    />
                  );
                return null;
              })}
            {nat && (
              <>
                <Naturtype {...nat} onNavigate={onNavigate} />
                <Beskrivelsessystem
                  variabler={nat.variabel}
                  onNavigate={onNavigate}
                />
              </>
            )}
            <Landskap landskap={landskap} />
          </div>
        </div>
      </>
    );
  }
}

export default Punkt;
