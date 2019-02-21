import { List, ListSubheader } from "@material-ui/core";
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
      opplystKode,
      onUpdateMetaProp
    } = this.props;

    if (!metadata || metadata.length <= 0) return null;
    return (
      <SettingsContext.Consumer>
        {context => (
          <List>
            <ListSubheader>{title}</ListSubheader>
            {subtitle && (
              <div
                style={{
                  padding: "0px 5px 0px 16px",
                  fontSize: "14px",
                  color: "rgba(95, 95, 95, 0.54)"
                }}
              >
                {subtitle}
              </div>
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
                    onNavigate={this.onNavigate}
                    onMouseEnter={this.onMouseEnter}
                    onMouseLeave={this.onMouseLeave}
                    opplystKode={opplystKode}
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
  onNavigate = url => this.props.onNavigate(url);
  onMouseEnter = kode =>
    this.props.onMouseEnter && this.props.onMouseEnter(kode);
  onMouseLeave = () => this.props.onMouseLeave && this.props.onMouseLeave();
}

const nøkkel = (node, sorterPåKode) => {
  if (node.sortering) return node.sortering;
  if (sorterPåKode) return node.kode.split(/-/).map(e => e.padStart(5, "0"));

  return språk(node.tittel);
};

Kodeliste.sorter = (barn, sorterPåKode) => {
  const sortert = barn.concat().sort((a, b) => {
    return nøkkel(a, sorterPåKode) >= nøkkel(b, sorterPåKode) ? 1 : -1;
  });
  return sortert;
};

export default Kodeliste;
