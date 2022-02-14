import React from "react";
import { SettingsContext } from "../../../SettingsContext";
import MapLayerElement from "./MapLayerElement";
import getKey from "../../../Funksjoner/getKey";

class Navigeringsliste extends React.Component {
  state = {
    items_to_load: 150
  };
  render() {
    const {
      parentkode,
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
                const { kode, skjul } = metaChild;
                if (skjul) return null;

                return (
                  <MapLayerElement
                    key={metaChild.kode}
                    setExpanded={setExpanded}
                    parentkode={parentkode}
                    meta={metaChild}
                    visKode={context.visKoder}
                    onNavigate={onNavigate}
                    onMouseEnter={onMouseEnter}
                    onMouseLeave={onMouseLeave}
                    opplyst={opplyst}
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
