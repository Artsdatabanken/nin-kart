import React from "react";
import {
  Layers,
  Visibility,
  Close,
  KeyboardArrowDown
} from "@material-ui/icons";

class Kartlag extends React.Component {
  render() {
    const { koder } = this.props.aktiveLag;
    console.log("dette er lista av aktive lag på riktig side ************: ");
    console.log(koder);
    //const keys = Object.keys(koder);

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
export default Kartlag;
