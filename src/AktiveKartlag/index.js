import { List } from "@material-ui/core";
import React from "react";
import { withRouter } from "react-router";
import { SettingsContext } from "../SettingsContext";
import BakgrunnskartElement from "./BakgrunnskartElement";
import PolygonlagElement from "./PolygonlagElement";

class AktiveKartlag extends React.Component {
  render() {
    const { koder } = this.props;
    const keys = Object.keys(koder);
    return (
      <SettingsContext.Consumer>
        {context => (
          <div>
            <h3>Aktive Kartlag</h3>
            <List>
              {keys.map(fkode => {
                const forelder = koder[fkode];
                return listeElement(forelder, this.props, context.visKoder);
              })}
            </List>
          </div>
        )}
      </SettingsContext.Consumer>
    );
  }
}

function finnType(kode) {
  switch (kode) {
    case "bakgrunnskart":
      return BakgrunnskartElement;
    default:
      return PolygonlagElement;
  }
}

function listeElement(forelder, props, visKoder) {
  const kode = forelder.kode;
  const {
    history,
    onRemoveSelectedLayer,
    onMouseEnter,
    onMouseLeave,
    onUpdateLayerProp
  } = props;
  const Type = finnType(kode);

  return (
    <Type
      key={kode}
      visKoder={visKoder}
      onClick={() => {
        onMouseLeave();
        history.push("/" + kode + "?vis");
      }}
      onUpdateLayerProp={onUpdateLayerProp}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onRemove={kode => onRemoveSelectedLayer(kode)}
      {...forelder}
    />
  );
}

export default withRouter(AktiveKartlag);
