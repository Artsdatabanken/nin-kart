import React, { useEffect, useState } from "react";
import Markdown from "markdown-to-jsx";
import { Link } from "react-router-dom";
import { Launch } from "@material-ui/icons/";

const baseurl =
  "https://raw.githubusercontent.com/wiki/Artsdatabanken/nin-kart/";

const ExternalLink = ({ href, children }) => (
  <a href={href}>
    {children} <Launch style={{ width: 16, verticalAlign: "middle" }} />
  </a>
);

const Anchor = ({ href, children }) => {
  href = href.replace("https://nin.artsdatabanken.no", "");
  const title = children.join(", ");
  if (href.indexOf("http") === 0)
    return <ExternalLink href={href}>{title}</ExternalLink>;
  return <Link to={href}>{title}</Link>;
};

const options = {
  overrides: {
    a: {
      component: Anchor
    }
  }
};

/*
 * Viser wiki-side fra https://github.com/Artsdatabanken/nin-kart/wiki/
 */
const WikiMarkdown = ({ sidenavn }) => {
  const url = baseurl + sidenavn + ".md";
  const [markdown, setMarkdown] = useState("");
  useEffect(() => {
    async function download() {
      const response = await fetch(url);
      setMarkdown(await response.text());
    }
    download();
  }, [url]);
  return <Markdown options={options}>{markdown}</Markdown>;
};

export default WikiMarkdown;
