import React from "react";
import {
  Layers,
  Visibility,
  Close,
  KeyboardArrowDown
} from "@material-ui/icons";
import { SettingsContext } from "../SettingsContext";
import { List } from "@material-ui/core";
import BakgrunnskartElement from "../AktiveKartlag/BakgrunnskartElement";
import PolygonlagElement from "../AktiveKartlag/PolygonlagElement";

class Kartlag extends React.Component {
  render() {
    let koder = this.props.aktiveLag;
    const keys = Object.keys(koder);

    return (
      <div className="kartlag sidebar">
        <div class="sidebar_title_container sidebar_element">
          <h1 class="sidebar_title">Kartlag</h1>
        </div>
        <div class="sidebar_element">
          <h3>Instillinger</h3>
          <ul className="kartlag_list">
            <li>Bakgrunnsfarger</li>
          </ul>
        </div>

        <div class="sidebar_element">
          <h3>Mine Kartlag</h3>
          <ul className="kartlag_list">
            <li>
              <Layers className="kartlag_main_icon" />
              <span className="kartlag_list_title">Eksempelkartlag</span>
              <span className="kartlag_list_icon_set">
                <KeyboardArrowDown />
                <Visibility />
                <Close />
              </span>
            </li>

            <li>
              <Layers className="kartlag_main_icon" />
              <span className="kartlag_list_title">
                Eksempelkartlag med masse kjempelang tekst for å se hva som
                skjer
              </span>
              <span className="kartlag_list_icon_set">
                <KeyboardArrowDown />
                <Visibility />
                <Close />
              </span>
            </li>

            <li>
              <Layers className="kartlag_main_icon" />
              <span className="kartlag_list_title">
                Eksempelkartlag med masse litt ekstra tekst
              </span>
              <span className="kartlag_list_icon_set">
                <KeyboardArrowDown />
                <Visibility />
                <Close />
              </span>
            </li>

            <li>
              <Layers className="kartlag_main_icon" />
              <span className="kartlag_list_title">Eksempelkartlag</span>
              <span className="kartlag_list_icon_set">
                <KeyboardArrowDown />
                <Visibility />
                <Close />
              </span>
            </li>
          </ul>
        </div>
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
        <div class="sidebar_element">
          <h3>Historikk</h3>
          <ul className="kartlag_list">
            <li>kommer her</li>
          </ul>
        </div>
      </div>
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

export default Kartlag;
