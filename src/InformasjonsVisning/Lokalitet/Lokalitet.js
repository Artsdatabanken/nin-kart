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

    // Stedsnavn
    backend.hentStedsnavn(lng, lat).then(sted => {
      this.setState({ sted: sted.placename });
    });

    // Gammelt api, kilde for kommune, fylke og annen data
    backend.hentPunktGammel(lng, lat).then(gammelData => {
      let firstlayer = gammelData["~"];
      let fylkeogkommune = firstlayer.values.AO;
      let fylkelayer = getNextLayer(fylkeogkommune);
      this.setState({
        fylke: fylkelayer.title,
        kommune: getNextLayer(fylkelayer).title
      });
      setPageUrl(this.state.kommune, this.state.fylke, lng, lat);
    });

    // Ny APIVERSJON, Mye ukontrollert data.
    backend.hentPunkt(lng, lat).then(data => {
      this.setState({
        fylke: data.fylke.tittel.nb,
        kommune: data.kommune.tittel.nb,
        data: data,
        landskap: data.landskap
      });
      setPageUrl(this.state.kommune, this.state.fylke, lng, lat);
    });
  }

  render() {
    const { lat, lng, aktivTab, onNavigate } = this.props;
    if (!lat) return null;
    const { data, fylke, kommune } = this.state;

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
