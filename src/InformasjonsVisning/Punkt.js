import React, { Component } from "react";
import Sted from "./Lokalitet/LokalitetElement/Sted";
import Landskap from "./Landskap";
import Naturvernområde from "./Lokalitet/LokalitetElement/Naturvernområde";
import Naturtype from "./Lokalitet/LokalitetElement/Naturtype";
import { IconButton } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import Header from "./Header";

class Punkt extends Component {
  render() {
    const { aktivTab, onNavigate, onClosePunkt, punkt } = this.props;
    const { lat, lng } = punkt;
    if (!lat) return null;
    const { fylke, kommune, sted, landskap, vektor } = punkt;
    var nat =
      Array.isArray(vektor) &&
      vektor.find((e) => e && e.datasettkode === "NAT");
    nat = (nat && nat.data) || {};
    const natvars = (nat.kartleggingsenhet || []).reduce((acc, e) => {
      //      if (e.variabel || e.variabler) console.log({ e })
      (e.variabler || []).forEach((v) => {
        const prefix = v.kode[9];
        acc[prefix] = acc[prefix] || [];
        acc[prefix][v.kode] = v;
        //console.warn(prefix, v.kode, v)
      });
      return acc;
    }, {});
    const natt = (nat.kartleggingsenhet || []).reduce((acc, e) => {
      //      if (e.variabel || e.variabler) console.log({ e })
      acc[e.kode] = e;
      return acc;
    }, {});
    const naturtyper = Object.values(natt);
    //    console.log({ natt })
    //    console.log({ natvars })
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
              top: 48,
              bottom: 0,
              width: 408,
              left: 0,
            }}
          >
            <Header
              sted={sted}
              fylke={fylke}
              kommune={kommune}
              lat={lat}
              lng={lng}
            />

            <IconButton
              style={{ position: "absolute", right: 8, top: 8 }}
              onClick={onClosePunkt}
            >
              <Close></Close>
            </IconButton>
            {nat && (
              <>
                {naturtyper.length > 0 && (
                  <Naturtype
                    typer={naturtyper}
                    variabler={natvars}
                    onNavigate={onNavigate}
                  />
                )}
              </>
            )}
            <Landskap landskap={landskap} />
            <Sted
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
          </div>
        </div>
      </>
    );
  }
}

export default Punkt;
