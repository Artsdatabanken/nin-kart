import { storiesOf } from "@storybook/react";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import { muiTheme } from "storybook-addon-material-ui";
import NA from "./NA";

var data = {
  surveyer: {
    company: "Rambøll",
    homepage: "",
    email: "geir.frode.langelo@ramboll.no",
    contactPerson: "Geir Frode Langelo"
  },
  description: "",
  surveyScale: "1:5000",
  project: {
    name: " RUT_16_BIOREG_06-ST2_LEINSTR_1",
    description:
      "Arealdekkende kartlegging etter NiN 2.0 i pressområder med rødlistede naturtyper. Leinstrand/Tiller (Sør-Trøndelag ,06-ST2, 119 ruter), Bioreg AS"
  },
  program: {
    name: "RUTE_2016_NORGE_1",
    description: "Rutekartlegging utenfor verneområder 2016."
  },
  owner: {
    company: "Miljødirektoratet",
    homepage: "http://www.miljodirektoratet.no",
    email: "kjetil.pettersson@miljodir.no",
    contactPerson: "kjepet (Kjetil Pettersson)"
  },
  codes: {
    NA_T44: {
      beskrivelsesvariabler: null,
      tittel: "Åker",
      andel: 8
    },
    NA_T39: {
      beskrivelsesvariabler: null,
      tittel: "Sterkt endret og ny fastmark i langsom suksesjon",
      andel: 1
    },
    NA_T38: {
      beskrivelsesvariabler: null,
      tittel: "Treplantasje",
      andel: 1
    }
  }
};

storiesOf("Spesifikt område", module)
  .addDecorator(muiTheme())
  .add("NA", () => (
    <MemoryRouter>
      <div style={{ width: 408 }}>
        <NA {...data} />
      </div>
    </MemoryRouter>
  ));
