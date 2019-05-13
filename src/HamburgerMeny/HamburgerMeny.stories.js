import { action } from "@storybook/addon-actions/dist/index";
import { storiesOf } from "@storybook/react";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import HamburgerMeny from "./HamburgerMeny";

storiesOf("HamburgerMeny", module).add("default", () => (
  <div>
    <MemoryRouter>
      <div>
        <HamburgerMeny
          erÅpen={false} // TODO: Why is jest failing whtn this is displayed
          toggleDrawer={action("onToggleDrawer")}
          onUpdateSetting={action("onUpdateSetting")}
        />
      </div>
    </MemoryRouter>
  </div>
));
