import React from "react";
import { SettingsContext } from "../../SettingsContext";
import CurrentLayerMainElement from "./CurrentLayerMainElement";
import getKey from "../../Funksjoner/getKey";

class LayerSubElementListe extends React.Component {
  state = {
    items_to_load: 150
  };
  render() {
    const {
      parentkode,
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
          <ul className="kartlag_list">
            {LayerSubElementListe.sorter(metadata, context.sorterPåKode).map(
              (metaChild, i) => {
                if (i > this.state.items_to_load) return null;
                const { kode, skjul } = metaChild;
                if (skjul) return null;

                return (
                  <CurrentLayerMainElement
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
          </ul>
        )}
      </SettingsContext.Consumer>
    );
  }
}

LayerSubElementListe.sorter = (barn, sorterPåKode) => {
  const sortert = barn.concat().sort((a, b) => {
    return getKey(a, sorterPåKode) >= getKey(b, sorterPåKode) ? 1 : -1;
  });
  return sortert;
};

export default LayerSubElementListe;
