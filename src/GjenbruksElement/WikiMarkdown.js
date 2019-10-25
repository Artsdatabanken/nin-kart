import React, { useEffect, useState } from "react";
import Markdown from "markdown-to-jsx";
import Lenke from "./Lenke";

const baseurl =
  "https://raw.githubusercontent.com/wiki/Artsdatabanken/nin-kart/";

const options = {
  overrides: {
    a: {
      component: Lenke
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
