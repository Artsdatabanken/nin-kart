import VisibilityToggle from "./VisibilityToggle";
import React from "react";
import { Layers, Close, KeyboardArrowDown } from "@material-ui/icons";
import { SettingsContext } from "../SettingsContext";
import språk from "../språk";
import { IconButton } from "@material-ui/core";

class Kartlag extends React.Component {
  render() {
    let koder = this.props.aktiveLag;
    const keys = Object.keys(koder);
    console.log(keys);

    return (
      <div className="kartlag sidebar">
        <div className="sidebar_title_container sidebar_element">
          <h1 className="sidebar_title">Kartlag</h1>
        </div>
        <div className="sidebar_element">
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
                  const kartlag = koder[fkode];
                  return listeElement(kartlag, this.props, context.visKoder);
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

function listeElement(kartlag, props, visKoder) {
  const kode = kartlag.kode;
  let tittel = kartlag.tittel;
  let farge = kartlag.farge;
  const erSynlig = kartlag.erSynlig;
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
  console.log(kartlag);
  const { onUpdateLayerProp, onRemoveSelectedLayer } = props;
  // const Type = finnType(kode);
  console.log(props);
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
        <VisibilityToggle
          kode={kode}
          erSynlig={erSynlig}
          onClick={e => {
            onUpdateLayerProp(kode, "erSynlig", !erSynlig);
            e.stopPropagation();
          }}
        />
        <IconButton onClick={() => onRemoveSelectedLayer(kode)}>
          <Close />
        </IconButton>
      </span>
    </li>
  );
}

export default Kartlag;
