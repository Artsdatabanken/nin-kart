import React from "react";
import { storiesOf } from "@storybook/react";
import ColorPicker from "./ColorPicker";
import { muiTheme } from "storybook-addon-material-ui";

storiesOf("ColorPicker", module)
  .addDecorator(muiTheme())
  .add("default", () => <ColorPicker />);
