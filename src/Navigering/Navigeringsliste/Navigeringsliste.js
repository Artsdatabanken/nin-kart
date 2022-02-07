import React from "react";
import { SettingsContext } from "../../SettingsContext";
import Kodelisteelement from "./Kodelisteelement";
import getKey from "./NavigeringslisteFunksjoner/getKey";

class Navigeringsliste extends React.Component {
  state = {
    items_to_load: 150
  };
  /* 
  
  Denne komponenten ligger i undermenyen. 
  F.eks på landskap ligger den under fanen landskap.
  Med andre ord - den bor alltid nedover i hierarkiet, ikke oppover.

  */
  render() {
    const {
      parentkode,
      størsteAreal,
      apidata,
      metadata,
      opplyst,
      onUpdateMetaProp,
      onMouseEnter,
      onMouseLeave,
      setExpanded,
      onNavigate,
      onUpdateLayerProp
    } = this.props;
    if (!metadata || metadata.length <= 0) return null;
    return (
      <SettingsContext.Consumer>
        {context => (
          <>
            {Navigeringsliste.sorter(metadata, context.sorterPåKode).map(
              (metaChild, i) => {
                if (i > this.state.items_to_load) return null;
                const { kode, skjul, url, value } = metaChild;
                const apibarn = apidata
                  ? apidata[
                      apidata
                        .map(apiItem => {
                          return apiItem.kode;
                        })
                        .indexOf(kode.toLowerCase())
                    ] || {}
                  : {};
                if (skjul) return null;

                return (
                  <Kodelisteelement
                    key={kode}
                    setExpanded={setExpanded}
                    kode={kode}
                    parentkode={parentkode}
                    url={url}
                    meta={metaChild}
                    størsteAreal={størsteAreal}
                    areal={apibarn.areal}
                    visKode={context.visKoder}
                    onNavigate={onNavigate}
                    onMouseEnter={onMouseEnter}
                    onMouseLeave={onMouseLeave}
                    opplyst={opplyst}
                    value={value}
                    onChange={v => onUpdateMetaProp(kode, "value", [...v])}
                    onUpdateLayerProp={onUpdateLayerProp}
                  />
                );
              }
            )}
          </>
        )}
      </SettingsContext.Consumer>
    );
  }
}

Navigeringsliste.sorter = (barn, sorterPåKode) => {
  const sortert = barn.concat().sort((a, b) => {
    return getKey(a, sorterPåKode) >= getKey(b, sorterPåKode) ? 1 : -1;
  });
  return sortert;
};

export default Navigeringsliste;
