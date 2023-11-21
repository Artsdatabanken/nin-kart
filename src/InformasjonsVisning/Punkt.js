import React, { Component } from "react";
import Sted from "./Lokalitet/LokalitetElement/Sted";
import Landskap from "./Landskap";
import NaturvernOmraade from "./Lokalitet/LokalitetElement/Naturvernområde";
import Naturtype from "./Lokalitet/LokalitetElement/Naturtype";
import Header from "./Header";
import LukkbartVindu from "../LukkbartVindu";
import { getKoordinatStreng } from "../koordinater";
import { MyLocation, Room } from "@material-ui/icons";

class Punkt extends Component {
  createNatvars = nat => {
    return (nat.kartleggingsenhet || []).reduce((acc, e) => {
      //      if (e.variabel || e.variabler) console.log({ e })
      (e.variabler || []).forEach(v => {
        const prefix = v.kode[9];
        acc[prefix] = acc[prefix] || [];
        acc[prefix][v.kode] = v;
        //console.warn(prefix, v.kode, v)
      });
      return acc;
    }, {});
  };

  createNatt = nat => {
    return (nat.kartleggingsenhet || []).reduce((acc, e) => {
      //      if (e.variabel || e.variabler) console.log({ e })
      acc[`${e.kode}_${e.andel}`] = e;
      return acc;
    }, {});
  };

  createNaturtyper = nat => {
    if (!nat) return nat;
    const natt = this.createNatt(nat);
    return Object.values(natt).sort((a, b) => (a.andel < b.andel ? 1 : -1));
  };

  createUlkm = nat => {
    return (nat.kartleggingsenhet || []).reduce((acc, e) => {
      let hasData = false;
      (e.ulkm || []).forEach(ulkm => {
        hasData = true;
        acc[ulkm.ulkmkode] = ulkm;
      });
      if (!hasData) return null;
      return acc;
    }, {});
  };

  render() {
    const {
      onNavigate,
      punkt,
      onNavigateToTab,
      handleShow,
      show,
      punktIsTopLayer
    } = this.props;
    if (!punkt) {
      return null;
    }
    const { lat, lng } = punkt;
    if (!lat) return null;
    const { fylke, kommune, sted, landskap } = punkt;
    const vektor = punkt.vektor || [];
    let natArray = vektor.filter(e => e && e.datasettkode === "NAT");
    if (Array.isArray(natArray) && natArray.length > 0) {
      natArray.forEach((element, i) => {
        natArray[i] = (element && element.data) || {};
      });
    } else {
      natArray = [(natArray && natArray.data) || {}];
    }
    const verneområde = vektor.find(e => e.datasettkode === "VV ");
    return (
      <LukkbartVindu
        onBack={() => onNavigateToTab("kartlag")}
        onClose={handleShow}
        show={show}
        tittel={"Punktinformasjon"}
        icon={<Room />}
        punktIsTopLayer={punktIsTopLayer}
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
        <div className="section">
          <div className="coordinates">
            <h3>
              <MyLocation />
              Koordinater
            </h3>
            <p>{getKoordinatStreng([lat, lng])}</p>
          </div>
        </div>

        {natArray &&
          natArray.map((nat, i) => {
            if (this.createNaturtyper(nat).length > 0) {
              return (
                <Naturtype
                  key={i}
                  showHeader={i === 0}
                  typer={this.createNaturtyper(nat)}
                  variabler={this.createNatvars(nat)}
                  ulkm={this.createUlkm(nat)}
                  onNavigate={onNavigate}
                  onNavigateToTab={onNavigateToTab}
                  punkt={punkt}
                  onClose={handleShow}
                />
              );
            }
            return null;
          })}

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
          vektor.map(v => {
            if (v.datasettkode === "VV ")
              return (
                <NaturvernOmraade key={v.id} {...v} onNavigate={onNavigate} />
              );
            return null;
          })}
      </LukkbartVindu>
    );
  }
}

export default Punkt;
