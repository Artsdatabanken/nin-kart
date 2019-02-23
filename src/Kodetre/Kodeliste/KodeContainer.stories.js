import React from "react";
import { storiesOf } from "@storybook/react";
import KodeContainer from "./KodeContainer";
import { muiTheme } from "storybook-addon-material-ui";

storiesOf("KodeContainer", module)
  .addDecorator(muiTheme())
  .add("default", () => <KodeContainer />);
