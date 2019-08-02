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
      sted: null,
      gammelData: null,
      fylke: null,
      kommune: null
    });
    backend.hentStedsnavn(lng, lat).then(sted => {
      this.setState({ sted: sted });
    });

    backend.hentPunktGammel(lng, lat).then(gammelData => {
      //console.warn(gammelData);
      for (let item in gammelData) {
        let fylkeogkommune = gammelData[item].values.AO;
        this.setState({
          gammelData: gammelData[item].values
        });
        let fylkelayer = getNextLayer(fylkeogkommune);
        this.setState({
          fylke: fylkelayer.title,
          kommune: getNextLayer(fylkelayer).title
        });
      }
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
      this.setState({
        gammelData: gammelData
      });
    });

    backend.hentPunkt(lng, lat).then(data => {
      //console.warn(data);

      /*
      this.setState({
        fylke: data.fylke.tittel.nb || "Oslo", /// FIKS! BARE FOR TESTING
        kommune: data.kommune.tittel.nb || "Oslo" /// FIKS! BARE FOR TESTING
      });

      let url =
        "/Fylke/" + this.state.fylke + "/" + this.state.kommune + "?lng=" + lng + "&lat=" + lat;
      url = url.replace(/ /g, "_");
      this.props.history.push(url);
      */
      this.setState({
        data: data
      });
    });
  }

  render() {
    const { lat, lng, aktivTab, onNavigate } = this.props;
    if (!lat) return null;
    const { data, fylke, gammelData, kommune } = this.state;
    if (!data) return null;
    console.log(gammelData);

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
              data={data}
              fylke={fylke}
              kommune={kommune}
              lat={lat}
              lng={lng}
            />
            <Landskapstypefordeling data={data} onNavigate={onNavigate} />
            <Byggeklosser data={data} onNavigate={onNavigate} />
          </div>
        </div>
        <div className="big_page_sidebar" />
      </>
    );
  }
}

export default Lokalitet;
