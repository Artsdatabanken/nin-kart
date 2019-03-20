import React from "react";
import Ingress from "./Ingress";
import Illustrasjon from "./Illustrasjon";
import Tekstboks from "./Tekstboks";
import Blokk from "./Blokk";

class Statistikk extends React.Component {
  render() {
    const blokker = this.props.blokker.map(blokk => {
      return <Blokk key={blokk.key}>{this.renderInnhold(blokk)}</Blokk>;
    });

    return (
      <>
        {this.props.ingress && (
          <Blokk>
            <Ingress beskrivelse={this.props.ingress} />
          </Blokk>
        )}
        {blokker}
      </>
    );
  }

  renderInnhold(blokk) {
    switch (blokk.type) {
      case "ingress":
        return <Ingress {...blokk} />;
      case "illustrasjon":
        return <Illustrasjon {...blokk} />;
      case "tekstboks":
        return <Tekstboks {...blokk} />;
      default:
        console.log("Skriv kode for å vise ", blokk.type);
        return null;
    }
  }
}

export default Statistikk;
