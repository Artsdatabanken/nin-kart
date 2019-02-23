import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import { storiesOf } from "@storybook/react";
import React from "react";
import Resultatliste from "./ResultatListe";
import { Paper, createMuiTheme } from "@material-ui/core";
import { muiTheme } from "storybook-addon-material-ui";

const results1 = [{ kode: "KA", navn: "Kalk" }];
const results2 = [
  {
    kode: "AR_100270",
    navn: { la: "Anthriscus caucalis", nb: "Krokkjørvel" },
    forelder: {
      kode: "AR_100269",
      navn: { la: "Anthriscus", nb: "Hundekjeksslekta" }
    }
  },
  {
    kode: "AR_100271",
    navn: { la: "Anthriscus cerefolium", nb: "Hagekjørvel" },
    forelder: {
      kode: "AR_100269",
      navn: { la: "Anthriscus", nb: "Hundekjeksslekta" }
    }
  },
  {
    kode: "AR_100342",
    navn: { la: "Myrrhis", nb: "Spanskkjørvelslekta" },
    forelder: {
      kode: "AR_100250",
      navn: { la: "Apiaceae", nb: "Skjermplantefamilien" }
    }
  },
  {
    kode: "AR_100343",
    navn: { la: "Myrrhis odorata", nb: "Spansk kjørvel" },
    forelder: {
      kode: "AR_100342",
      navn: { la: "Myrrhis", nb: "Spanskkjørvelslekta" }
    }
  },
  {
    kode: "AR_100344",
    navn: { la: "Oenanthe", nb: "Hestekjørvelslekta" },
    forelder: {
      kode: "AR_100250",
      navn: { la: "Apiaceae", nb: "Skjermplantefamilien" }
    }
  },
  {
    kode: "AR_100345",
    navn: { la: "Oenanthe aquatica", nb: "Hestekjørvel" },
    forelder: {
      kode: "AR_100344",
      navn: { la: "Oenanthe", nb: "Hestekjørvelslekta" }
    }
  },
  {
    kode: "AR_101157",
    navn: { la: "Cochlearia", nb: "Skjørbuksurtslekta" },
    forelder: {
      kode: "AR_101069",
      navn: { la: "Brassicaceae", nb: "Korsblomstfamilien" }
    }
  },
  {
    kode: "AR_101158",
    navn: { la: "Cochlearia anglica", nb: "Engelsk skjørbuksurt" },
    forelder: {
      kode: "AR_101157",
      navn: { la: "Cochlearia", nb: "Skjørbuksurtslekta" }
    }
  },
  {
    kode: "AR_101159",
    navn: { la: "Cochlearia danica", nb: "Dansk skjørbuksurt" },
    forelder: {
      kode: "AR_101157",
      navn: { la: "Cochlearia", nb: "Skjørbuksurtslekta" }
    }
  },
  {
    kode: "AR_101160",
    navn: { la: "Cochlearia groenlandica", nb: "Polarskjørbuksurt" },
    forelder: {
      kode: "AR_101157",
      navn: { la: "Cochlearia", nb: "Skjørbuksurtslekta" }
    }
  }
];

storiesOf("Resultatliste", module)
  .addDecorator(muiTheme())
  .add("default", () => {
    return (
      <Paper style={{ margin: 12, width: 408 }}>
        <Resultatliste searchResults={results1} query="alk" />
        <Resultatliste searchResults={results2} query="kjø" />
      </Paper>
    );
  });
