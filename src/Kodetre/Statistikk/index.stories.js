import { storiesOf } from "@storybook/react";
import React from "react";
import { muiTheme } from "storybook-addon-material-ui";
import Statistikk from "./";

var taxJson = [
  {
    key: 0,
    type: "ingress",
    bilde: "https://www.artsdatabanken.no/Media/F819?mode=1920x1920",
    infoUrl: "https://www.artsdatabanken.no/Pages/205713",
    ingress: "ingress",
    beskrivelse:
      "43 705 arter er påvist i Norge, og 65 % av artene finnes i dyreriket. Insektene utgjør den største gruppen med over 18 000 arter. Fortsatt er mange arter uoppdaget og vi regner med at det finnes omkring 60 000 arter i Norge."
  },
  {
    key: 1,
    type: "illustrasjon",
    bilde: "https://www.artsdatabanken.no/Media/F16019?mode=1920x1920",
    beskrivelse:
      "Prosentvis fordelingen av de påviste artene mellom rikene: dyreriket (Animalia), soppriket (Fungi), planteriket (Plantae), det gule riket (Chromista), protistriket (Protozoa), alveolatriket (Alveolata) og slimriket (Amoebozoa)."
  },
  {
    key: 2,
    type: "illustrasjon",
    bilde: "https://www.artsdatabanken.no/Media/F16154?mode=1920x1920",
    beskrivelse:
      "Totalt antall nye arter for Norge fordelt på seks grupper. Artene er funnet gjennom kartleggingsprosjekter støttet av Artsdatabanken (Artsprosjektet). Antall nye arter i Norge, som også er nye for vitenskapen, er vist i nedre del av søylene."
  },
  {
    key: 3,
    type: "tekstboks",
    tittel: "Hva betyr påvist i Norge?",
    beskrivelse:
      "Påvist i Norge innebærer at arten er dokumentert med funn på norsk territorium.",
    infoUrl: "https://www.artsdatabanken.no/Pages/205723"
  }
];

storiesOf("Statistikk", module)
  .addDecorator(muiTheme())
  .add("arter", () => (
    <div style={{ width: 480 }}>
      <Statistikk blokker={taxJson} />
    </div>
  ));
