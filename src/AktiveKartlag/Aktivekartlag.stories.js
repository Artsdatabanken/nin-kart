import { action } from "@storybook/addon-actions/dist/index";
import { storiesOf } from "@storybook/react";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import { muiTheme } from "storybook-addon-material-ui";
import AktiveKartlag from ".";

const koder = [{ kode: "TST", tittel: "Blåbærskog", farge: "#f0f" }];

storiesOf("Aktive kartlag", module)
  .addDecorator(muiTheme())
  .add("default", () => (
    <div style={{ width: 400 }}>
      <MemoryRouter>
        <AktiveKartlag
          koder={koder}
          onMouseEnter={action("mouseEnter")}
          onMouseLeave={action("mouseLeave")}
          onRemoveSelectedLayer={action("onRemoveSelectedLayer")}
        />
      </MemoryRouter>
    </div>
  ));
