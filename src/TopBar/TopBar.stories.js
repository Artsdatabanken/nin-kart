import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import { muiTheme } from "storybook-addon-material-ui";
import AppBar from "./TopBar";

const dummyTaxon = [
  {
    id: 1045,
    aggreggatedCount: 494614,
    scientificName: "Agaricomycetes",
    popularName: null
  }
];

storiesOf("App Bar", module)
  .addDecorator(muiTheme())
  .add("root", () => (
    <MemoryRouter>
      <AppBar taxon={dummyTaxon} onClick={action("click")} />
    </MemoryRouter>
  ))
  .add("down into tree", () => (
    <MemoryRouter>
      <AppBar taxon={dummyTaxon} />
    </MemoryRouter>
  ));
