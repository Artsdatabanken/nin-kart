import React, { useState, useEffect } from "react";
import Relasjon from "Sidebar/Katalog/Relasjoner/Relasjon";
import { CloudDownload } from "@material-ui/icons";
import { Button } from "@material-ui/core";

const KatalogKilder = ({ onNavigate, meta, opplyst, ...props }) => {
  const initialExpand = () =>
    JSON.parse(localStorage.getItem("expand") || "{}");
  const [expand, setExpand] = useState(initialExpand);
  useEffect(() => {
    localStorage.setItem("expand", JSON.stringify(expand));
  }, [expand]);

  if (!meta) return null;
  const { kode, url } = meta;
  return (
    <div>
      <Relasjon
        heading={"Datakilde"}
        url={url}
        noder={meta.datakilde}
        parentkode={kode}
        onNavigate={onNavigate}
        expand={expand}
        onSetExpand={setExpand}
        opplyst={opplyst}
        {...props}
      >
        <div className="sidebar_element_padding">
          <Button
            variant="contained"
            color="default"
            onClick={() => {
              window.location = "https://data.artsdatabanken.no/" + props.url;
            }}
          >
            <CloudDownload /> Last ned åpne data
          </Button>
        </div>
      </Relasjon>
    </div>
  );
};

export default KatalogKilder;
