import React, { Component } from "react";
import KartlagElement from "./Kartlagelement";
class TerrenglagElement extends Component {
  undertittel() {
    const {
      vertikaltOverdriv,
      visKontur,
      konturintervall
    } = this.props.terreng;
    let r = [];
    if (vertikaltOverdriv !== 1)
      r.push(vertikaltOverdriv.toFixed(1) + "x overdrevet");
    if (visKontur) r.push("kontur " + konturintervall + "m");
    return r.join(", ");
  }

  render() {
    return (
      <KartlagElement
        kode="terreng"
        tittel="Terreng"
        undertittel={this.undertittel()}
        {...this.props}
      />
    );
  }
}

export default TerrenglagElement;
