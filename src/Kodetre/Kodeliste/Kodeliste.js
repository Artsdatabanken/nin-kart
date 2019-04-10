import { Typography, List, ListSubheader } from "@material-ui/core";
import React from "react";
import { SettingsContext } from "../../SettingsContext";
import språk from "../../språk";
import Kodelisteelement from "./Kodelisteelement";

class Kodeliste extends React.Component {
  render() {
    const {
      parentkode,
      title,
      subtitle,
      størsteAreal,
      apidata,
      metadata,
      opplyst,
      onUpdateMetaProp,
      onMouseEnter,
      onMouseLeave,
      onNavigate
    } = this.props;
    console.log("kodelist", parentkode, opplyst);

    if (!metadata || metadata.length <= 0) return null;
    return (
      <SettingsContext.Consumer>
        {context => (
          <List>
            <ListSubheader>{title}</ListSubheader>
            {subtitle && (
              <Typography
                variant="body1"
                style={{
                  padding: "0px 8px 8px 16px",
                  color: "rgba(0,0,0, 0.65)"
                }}
              >
                {subtitle}
              </Typography>
            )}
            {Kodeliste.sorter(metadata, context.sorterPåKode).map(
              metabarnet => {
                const kode = metabarnet.kode;
                const apibarn = apidata
                  ? apidata[
                      apidata
                        .map(apiItem => {
                          return apiItem.kode;
                        })
                        .indexOf(kode.toLowerCase())
                    ] || {}
                  : {};
                if (metabarnet.skjul) return null;
                return (
                  <Kodelisteelement
                    key={kode}
                    kode={kode}
                    parentkode={parentkode}
                    url={metabarnet.url}
                    meta={metabarnet}
                    størsteAreal={størsteAreal}
                    areal={apibarn.areal}
                    visKode={context.visKoder}
                    onNavigate={onNavigate}
                    onMouseEnter={onMouseEnter}
                    onMouseLeave={onMouseLeave}
                    opplyst={opplyst}
                    value={metabarnet.value}
                    onChange={v => onUpdateMetaProp(kode, "value", [...v])}
                  />
                );
              }
            )}
          </List>
        )}
      </SettingsContext.Consumer>
    );
  }
}

const nøkkel = (node, sorterPåKode) => {
  if (node.sortering) return node.sortering;
  if (sorterPåKode)
    return node.kode
      .replace("+", "Z")
      .split(/-/)
      .map(e => e.padStart(5, "0"));

  return språk(node.tittel);
};

Kodeliste.sorter = (barn, sorterPåKode) => {
  const sortert = barn.concat().sort((a, b) => {
    return nøkkel(a, sorterPåKode) >= nøkkel(b, sorterPåKode) ? 1 : -1;
  });
  return sortert;
};

export default Kodeliste;
