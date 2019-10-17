import React from "react";
import { SettingsContext } from "SettingsContext";
import Kodelisteelement from "./Kodelisteelement";
import getKey from "./NavigeringslisteFunksjoner/getKey";

class Navigeringsliste extends React.Component {
  state = {
    items_to_load: 15
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
      onNavigate
    } = this.props;
    if (!metadata || metadata.length <= 0) return null;
    return (
      <SettingsContext.Consumer>
        {context => (
          <>
            {Navigeringsliste.sorter(metadata, context.sorterPåKode).map(
              (metabarnet, i) => {
                while (i < this.state.items_to_load) {
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
                      setExpanded={setExpanded}
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

                return null;
              }
            )}
            {metadata.length > this.state.items_to_load && (
              <button
                className="load_more_button"
                onClick={() =>
                  this.setState({
                    items_to_load: this.state.items_to_load + 10
                  })
                }
              >
                ... <br />
                Last inn fler
              </button>
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
