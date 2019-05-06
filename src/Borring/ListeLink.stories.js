import { storiesOf } from "@storybook/react";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import { muiTheme } from "storybook-addon-material-ui";
import ListeLink from "./ListeLink";

storiesOf("ListeLink", module)
  .addDecorator(muiTheme())
  .add("default", () => (
    <MemoryRouter>
      <div style={{ width: 392 }}>
        <ListeLink
          kode="AO"
          primary="Kåsa (17.9 moh)"
          secondary="Melhus, Trøndelag"
        />
        <ListeLink kode="VV" primary="Gammelelva" secondary="Naturreservat" />
        <ListeLink
          kode="LA_NF"
          primary="Nedskåret fjordlandskap"
          secondary="Landskap"
        />
        {false && (
          <ListeLink
            kode="jordbrukspreg"
            primary="Høyt jordbrukspreg"
            secondary="Jordbrukspreg"
          />
        )}
        <ListeLink kode="NA_T44" primary="Åker" secondary="Natursystem" />
        <ListeLink
          kode="BS_6"
          primary="Svakt oseanisk seksjon, sørboreal sone"
          secondary="Regional naturvariasjon"
        />
        <ListeLink
          kode="BS_7"
          primary="Gjennomgripende grøfting"
          secondary="Tilstandsvariasjon"
        />
        <ListeLink
          kode="RL_VU"
          primary="Sårbar naturtype"
          secondary="Rødliste"
        />
      </div>
    </MemoryRouter>
  ));
