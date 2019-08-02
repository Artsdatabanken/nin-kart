import React, { Component } from "react";
import backend from "Funksjoner/backend";
import Byggeklosser from "./LokalitetElement/Byggeklosser";
import Stedsinfo from "./LokalitetElement/Stedsinfo";
import Landskapstypefordeling from "./LokalitetElement/Landskapstypefordeling";
import "style/Lokasjon.css";

function getNextLayer(next_layer) {
  for (let j in next_layer.values) {
    return next_layer.values[j];
  }
}

function setPageUrl(kommune, fylke, lng, lat) {
  let url =
    "/Fylke/" +
    this.state.fylke +
    "/" +
    this.state.kommune +
    "?lng=" +
    lng +
    "&lat=" +
    lat;
  url = url.replace(/ /g, "_");
  this.props.history.push(url);
}

class Lokalitet extends Component {
  state = { bareAktive: false };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.lng !== this.props.lng || this.props.lat !== prevProps.lat)
      this.fetch(this.props.lng, this.props.lat, this.props.localId);
  }
  componentDidMount() {
    this.fetch(this.props.lng, this.props.lat);
  }

  fetch(lng, lat) {
    this.setState({
      data: null,
      sted: "Mangler stedsnavn",
      gammelData: null,
      fylke: null,
      kommune: null,
      landskap: null
    });

    backend.hentStedsnavn(lng, lat).then(sted => {
      this.setState({ sted: sted.placename });
    });

    // GAMMEL BACKUPVERSJON
    backend.hentPunktGammel(lng, lat).then(gammelData => {
      //console.warn(gammelData);
      let firstlayer = gammelData["~"];
      let fylkeogkommune = firstlayer.values.AO;
      let landskap = firstlayer.values.LA;
      let fylkelayer = getNextLayer(fylkeogkommune);
      this.setState({
        gammelData: firstlayer.values,
        fylke: fylkelayer.title,
        kommune: getNextLayer(fylkelayer).title,
        gammelData: gammelData,
        landskap: landskap.values
      });
      setPageUrl(this.state.kommune, this.state.fylke, lng, lat);
    });

    // GAMMEL APIVERSJON, Mye ukontrollert data.
    backend.hentPunkt(lng, lat).then(data => {
      //console.warn(data);
      this.setState({
        fylke: data.fylke.tittel.nb,
        kommune: data.kommune.tittel.nb,
        data: data
      });
      setPageUrl(this.state.kommune, this.state.fylke, lng, lat);
    });
  }

  // NY DELVIS FUNGERENDE VERSJON
  render() {
    const { lat, lng, aktivTab, onNavigate } = this.props;
    if (!lat) return null;
    const { data, fylke, gammelData, kommune } = this.state;
    if (!gammelData) return null;

    return (
      <>
        <div
          className={
            (aktivTab === "informasjon" ? "mobile_on" : "mobile_off") +
            " main_body"
          }
        >
          <div className="main_body_wrapper">
            <Stedsinfo
              sted={this.state.sted}
              fylke={fylke}
              kommune={kommune}
              lat={lat}
              lng={lng}
            />
            {this.state.landskap && (
              <Landskapstypefordeling
                data={data}
                onNavigate={onNavigate}
                landskap={this.state.landskap}
              />
            )}
            {data && <Byggeklosser data={data} onNavigate={onNavigate} />}
          </div>
        </div>
        <div className="big_page_sidebar" />
      </>
    );
  }
}

export default Lokalitet;
