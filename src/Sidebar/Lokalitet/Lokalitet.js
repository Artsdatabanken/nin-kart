import React, { Component } from "react";
import backend from "Funksjoner/backend";
import Byggeklosser from "./LokalitetElement/Byggeklosser";
import Stedsinfo from "./LokalitetElement/Stedsinfo";
import Landskapstypefordeling from "./LokalitetElement/Landskapstypefordeling";
import "style/Lokasjon.css";

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
      sted: null
    });
    backend.hentStedsnavn(lng, lat).then(sted => {
      this.setState({ sted: sted });
    });
    backend.hentPunkt(lng, lat).then(data => {
      //console.warn(data);
      const fylke = data.fylke.tittel.nb || "Oslo"; /// FIKS! BARE FOR TESTING
      const kommune = data.kommune.tittel.nb || "Oslo"; /// FIKS! BARE FOR TESTING
      let url =
        "/Fylke/" + fylke + "/" + kommune + "?lng=" + lng + "&lat=" + lat;
      url = url.replace(/ /g, "_");
      this.props.history.push(url);
      this.setState({
        data: data
      });
    });
  }

  render() {
    const { lat, lng, aktivTab, onNavigate } = this.props;
    if (!lat) return null;
    const { data } = this.state;
    if (!data) return null;

    return (
      <>
        <div
          className={
            (aktivTab === "informasjon" ? "mobile_on" : "mobile_off") +
            " main_body"
          }
        >
          <div className="main_body_wrapper">
            <Stedsinfo data={data} lat={lat} lng={lng} />
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
