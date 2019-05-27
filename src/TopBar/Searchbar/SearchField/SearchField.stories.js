import { storiesOf } from "@storybook/react";
import React from "react";
import { muiTheme } from "storybook-addon-material-ui";
import SearchBox from "./SearchBox";

storiesOf("SearchBox", module)
  .addDecorator(muiTheme())
  .add("default", () => <SearchBox />);
