import React from "react";
import { Launch } from "@material-ui/icons/";

const EksternLenke = ({ href, children }) => (
  <a href={href}>
    {children} <Launch style={{ width: 16, verticalAlign: "middle" }} />
  </a>
);

export default EksternLenke;
