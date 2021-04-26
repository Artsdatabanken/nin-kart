import React, { Component } from "react";
import Sted from "./Lokalitet/LokalitetElement/Sted";
import Landskap from "./Landskap";
import Naturvernområde from "./Lokalitet/LokalitetElement/Naturvernområde";
import Naturtype from "./Lokalitet/LokalitetElement/Naturtype";
import Header from "./Header";
import LukkbartVindu from "../LukkbartVindu";
import { getKoordinatStreng } from "../koordinater";

class Punkt extends Component {
  render() {
    const {
      aktivTab,
      onNavigate,
      punkt,
      onClose,
      onNavigateToTab,
    } = this.props;
    const { lat, lng } = punkt;
    if (!lat) return null;
    const { fylke, kommune, sted, landskap } = punkt;
    const vektor = punkt.vektor || [];
    var nat = vektor.find((e) => e && e.datasettkode === "NAT");
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
    const naturtyper = Object.values(natt).sort((a, b) =>
      a.andel < b.andel ? 1 : -1
    );
    const verneområde = vektor.find((e) => e.datasettkode === "VV ");
    return (
      <>
        <div
          className={aktivTab === "informasjon" ? "mobile_on" : "mobile_off"}
        >
          <LukkbartVindu
            onBack={() => onNavigateToTab("kartlag")}
            onClose={onClose}
            tittel={getKoordinatStreng([lat, lng])}
          >
            {false && (
              <Header
                sted={sted}
                fylke={fylke}
                kommune={kommune}
                lat={lat}
                lng={lng}
              />
            )}

            {nat && (
              <>
                {naturtyper.length > 0 && (
                  <Naturtype
                    typer={naturtyper}
                    variabler={natvars}
                    onNavigate={onNavigate}
                    onNavigateToTab={onNavigateToTab}
                  />
                )}
              </>
            )}
            <Landskap landskap={landskap} />
            <Sted
              sted={sted}
              verneområde={verneområde}
              fylke={fylke}
              kommune={kommune}
              lat={lat}
              lng={lng}
              onNavigate={onNavigate}
            />
            {false &&
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
          </LukkbartVindu>
        </div>
      </>
    );
  }
}

export default Punkt;
