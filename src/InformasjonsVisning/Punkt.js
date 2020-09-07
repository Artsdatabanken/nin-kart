import React, { Component } from "react";
import Geografi from "./Lokalitet/LokalitetElement/Geografi";
import Landskap from "./Landskap";
import Naturvernområde from "./Lokalitet/LokalitetElement/Naturvernområde";
import Naturtype from "./Lokalitet/LokalitetElement/Naturtype";

class Punkt extends Component {
  render() {
    const { aktivTab, onNavigate, punkt } = this.props;
    const { lat, lng } = punkt;
    if (!lat) return null;
    const { fylke, kommune, sted, landskap, vektor } = punkt;
    const nat = (vektor || []).find((e) => e.datasettkode === "NAT");
    return (
      <>
        <div
          className={
            (aktivTab === "informasjon" ? "mobile_on" : "mobile_off") +
            " main_bodyx"
          }
        >
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
              console.log("kode", v.kode);
              if (v.datasettkode === "VV ")
                return <Naturvernområde key={v.id} {...v} />;
              return null;
            })}
          {nat && <Naturtype key={nat.data.type.join(",")} {...nat} />}
          <Landskap landskap={landskap} />
        </div>
      </>
    );
  }
}

export default Punkt;
