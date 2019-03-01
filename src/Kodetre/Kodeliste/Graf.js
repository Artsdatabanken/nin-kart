import React, { Component } from "react";
import Kodeliste from "./Kodeliste";

const titler = {
  mengdeart: {
    title: "Mengdearter",
    subtitle:
      "Art med gjennomsnittlig dekning eller biomasseandel større enn 1/8 i et utvalg av enkeltobservasjonsenheter."
  },
  dominerende_mengdeart: {
    title: "Dominerende mengdearter",
    subtitle:
      "Art med gjennomsnittlig dekning eller biomasseandel større enn 1/4 i et utvalg av enkeltobservasjonsenheter."
  },
  vanlig_art: {
    title: "Vanlige arter",
    subtitle:
      "Art med frekvens større enn 1/8 i et utvalg enkeltobservasjonsenheter. For at en art skal være «vanlig», må den tilfredsstille dette kravet om frekvens > 1/8 i hele naturtypens utbredelsesområde, ikke bare innenfor artens utbredelsesområde."
  },
  konstant_art: {
    title: "Konstante arter",
    subtitle:
      "Art med frekvens større enn 4/5 i et utvalg enkeltobservasjonsenheter. Dette er den klassiske definisjonen av «konstant»  som er brukt i vegetasjonsøkologi"
  },
  tyngdepunktart: {
    title: "Tyngdepunktarter",
    subtitle:
      "Art med høyere frekvens og dekning i en aktuell naturtype (hovedtype eller grunntype) enn i et sammenliknbart utvalg typer (f.eks. andre hovedtyper som tilhører samme hovedtypegruppe eller andre grunntyper som tilhører samme hovedtype"
  },
  "gradient-tyngdepunktart": {
    title: "Gradient-tyngdepunktarter",
    subtitle:
      "Art med høyere frekvens og dekning på et gitt trinn langs en lokal kompleks miljøgradient (LKMg) enn på ethvert annet trinn langs den samme LKMg (gitt at variasjonen langs alle andre lokale komplekse miljøvariabler holdes konstant"
  },
  kjennetegnende_tyngdepunktart: {
    title: "Kjennetegnende tyngdepunktarter",
    subtitle:
      "Tyngdepunktart som utelukkende eller nesten utelukkende forekommer i en naturtype eller gruppe av naturtyper på et eller annet generaliseringsnivå"
  },
  skilleart: {
    title: "Skilleart",
    subtitle:
      "Art med høyere frekvens og/eller dekning i én av to eller flere naturtyper som sammenliknes. For skillearter angis hvilke basistrinn langs hvilke LKM’er de er skillearter for, på en standardisert måte. F.eks. betyr «absolutt skilleart[UF∙f|g]» at arten er absolutt skilleart for uttørkingsfare (UF) basistrinn f mot basistrinn g."
  },
  "svak_relativ skilleart": {
    title: "Svak relativ skilleart",
    subtitle: ""
  },
  "sterk_relativ skilleart": {
    title: "Sterk relativ skilleart",
    subtitle: ""
  },
  absolutt_skilleart: {
    title: "Absolutte skillearter",
    subtitle:
      "Art som normalt bare forekommer i én blant to eller flere naturtyper som sammenliknes"
  }
};

class Graf extends Component {
  render() {
    const {
      graf,
      parentkode,
      onNavigate,
      onMouseEnter,
      onMouseLeave,
      opplystKode
    } = this.props;
    if (!graf) return null;
    return graf.map(relasjon => {
      const kant = relasjon.type;
      const x = titler[kant] || { title: kant };
      return (
        <Kodeliste
          key={kant}
          parentkode={parentkode}
          onNavigate={onNavigate}
          title={x.title}
          subtitle={x.subtitle}
          metadata={relasjon.noder}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          opplystKode={opplystKode}
        />
      );
    });
  }
}

export default Graf;
