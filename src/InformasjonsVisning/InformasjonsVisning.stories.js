import { action } from "@storybook/addon-actions/dist/index";
import { storiesOf } from "@storybook/react";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import { muiTheme } from "storybook-addon-material-ui";
import KatalogFane from "InformasjonsVisning/Katalog/KatalogFane";

storiesOf("VenstreVindu", module)
  .addDecorator(muiTheme())
  .add("Rot", () => {
    return (
      <div
        style={{
          padding: 8,
          width: 408,
          height: "100%",
          backgroundColor: "red"
        }}
      >
        <MemoryRouter>
          <KatalogFane aktiveLag={[]} />
        </MemoryRouter>
      </div>
    );
  })
  .add("Complex", () => {
    return (
      <div style={{ padding: 8 }}>
        <MemoryRouter>
          <KatalogFane
            aktiveLag={[]}
            onToggleMainDrawer={action("onToggleMainDrawer")}
            onMouseEnter={action("onMouseEnter")}
            onMouseLeave={action("onMouseLeave")}
            onFitBounds={action("onFitBounds")}
            onAddSelected={action("onAddSelected")}
            onExitToRoot={action("onExitToRoot")}
            meta={""}
            onShowColorpicker={action("onShowColorpicker")}
            visValgte={false}
          />
        </MemoryRouter>
      </div>
    );
  });
