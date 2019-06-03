import { List, ListSubheader } from "@material-ui/core";
import React from "react";
import { SettingsContext } from "SettingsContext";
import språk from "Funksjoner/språk";
import Kodelisteelement from "./Kodelisteelement";

class Navigeringsliste extends React.Component {
  /* 
  
  Denne komponenten ligger i undermenyen. 
  F.eks på landskap ligger den under fanen landskap.
  Med andre ord - den bor alltid nedover i hierarkiet, ikke oppover.
  
  */
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
    //console.log("kodelist", parentkode, opplyst);

    if (!metadata || metadata.length <= 0) return null;
    return (
      <SettingsContext.Consumer>
        {context => (
          <List>
            <h1>Her er jeg</h1>
            <ListSubheader>{title}</ListSubheader>
            {subtitle && <h2>{subtitle}</h2>}
            {Navigeringsliste.sorter(metadata, context.sorterPåKode).map(
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

Navigeringsliste.sorter = (barn, sorterPåKode) => {
  const sortert = barn.concat().sort((a, b) => {
    return nøkkel(a, sorterPåKode) >= nøkkel(b, sorterPåKode) ? 1 : -1;
  });
  return sortert;
};

export default Navigeringsliste;
