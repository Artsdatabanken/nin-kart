import React from "react";
import { Link } from "react-router-dom";
import EksternLenke from "./EksternLenke";

/*
 * Indikerer hva som er eksterne lenker
 * Følge interne lenker uten å laste siden på nytt.
 */
const Lenke = ({ href, children }) => {
  href = href.replace("https://nin.artsdatabanken.no", "");
  const title = children.join(", ");
  if (href.indexOf("http") === 0)
    return <EksternLenke href={href}>{title}</EksternLenke>;
  return <Link to={href}>{title}</Link>;
};

export default Lenke;
