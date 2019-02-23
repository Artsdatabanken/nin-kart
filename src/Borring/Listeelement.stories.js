import { storiesOf } from "@storybook/react";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import { muiTheme } from "storybook-addon-material-ui";
import Listeelement from "./Listeelement";

storiesOf("Listeelement", module)
  .addDecorator(muiTheme())
  .add("default", () => (
    <MemoryRouter>
      <div style={{ width: 392 }}>
        <Listeelement
          kode="AO"
          primary="Kåsa (17.9 moh)"
          secondary="Melhus, Trøndelag"
        />
        <Listeelement
          kode="VV"
          primary="Gammelelva"
          secondary="Naturreservat"
        />
        <Listeelement
          kode="LA_NF"
          primary="Nedskåret fjordlandskap"
          secondary="Landskap"
        />
        {false && (
          <Listeelement
            kode="jordbrukspreg"
            primary="Høyt jordbrukspreg"
            secondary="Jordbrukspreg"
          />
        )}
        <Listeelement kode="NA_T44" primary="Åker" secondary="Natursystem" />
        <Listeelement
          kode="BS_6"
          primary="Svakt oseanisk seksjon, sørboreal sone"
          secondary="Regional naturvariasjon"
        />
        <Listeelement
          kode="BS_7"
          primary="Gjennomgripende grøfting"
          secondary="Tilstandsvariasjon"
        />
        <Listeelement
          kode="RL_VU"
          primary="Sårbar naturtype"
          secondary="Rødliste"
        />
      </div>
    </MemoryRouter>
  ));
