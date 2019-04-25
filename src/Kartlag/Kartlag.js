import React from "react";
import {
  Layers,
  Visibility,
  Close,
  KeyboardArrowDown
} from "@material-ui/icons";
import { SettingsContext } from "../SettingsContext";
import språk from "../språk";

class Kartlag extends React.Component {
  render() {
    let koder = this.props.aktiveLag;
    const keys = Object.keys(koder);
    console.log(keys);

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
          <SettingsContext.Consumer>
            {context => (
              <ul className="kartlag_list">
                {keys.map(fkode => {
                  const forelder = koder[fkode];
                  return listeElement(forelder, this.props, context.visKoder);
                })}
              </ul>
            )}
          </SettingsContext.Consumer>
        </div>

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

function listeElement(forelder, props, visKoder) {
  const kode = forelder.kode;
  let tittel = forelder.tittel;
  let farge = forelder.farge;
  /*
  
  let type = forelder.type;
  let erSynlig;
  let kart;
  let terreng;

  // onClick={() => { history.push("/" + kode + "?vis");}}
  // onUpdateLayerProp={onUpdateLayerProp}
  // onRemove={kode => onRemoveSelectedLayer(kode)}

  if (kode === "bakgrunnskart"){
    let undertittel = forelder.tema;
  }
  
  */
  console.log(forelder);
  const { onUpdateLayerProp } = props;
  // const Type = finnType(kode);

  return (
    <li>
      <Layers className="kartlag_main_icon" />
      <span className="kartlag_list_title">
        {" "}
        {språk(tittel)}-{" "}
        <span
          style={{
            color: farge
          }}
        >
          {kode}
        </span>
      </span>
      <span className="kartlag_list_icon_set">
        <KeyboardArrowDown />
        <Visibility />
        <Close />
      </span>
    </li>
  );
}

export default Kartlag;
