import React, { Component } from "react";
import backend from "Funksjoner/backend";
import Byggeklosser from "./LokalitetElement/Byggeklosser";
import Stedsinfo from "./LokalitetElement/Stedsinfo";
import Landskapstypefordeling from "./LokalitetElement/Landskapstypefordeling";
import språk from "Funksjoner/språk";
import "style/Lokasjon.scss";

class Lokalitet extends Component {
  state = { bareAktive: false };

  componentDidUpdate(prevProps) {
    if (prevProps.lng !== this.props.lng || this.props.lat !== prevProps.lat)
      this.fetch(this.props.lng, this.props.lat, this.props.localId);
  }
  componentDidMount() {
    this.fetch(this.props.lng, this.props.lat);
  }

  fetch(lng, lat) {
    this.setState({
      data: null,
      sted: "",
      gammelData: null,
      fylke: null,
      kommune: null,
      landskap: null
    });

    console.log("lokalitet hent sted");

    // Stedsnavn
    backend.hentStedsnavn(lng, lat).then(sted => {
      this.setState({ sted });
    });

    // Ny APIVERSJON, Mye ukontrollert data.
    backend.hentPunkt(lng, lat).then(data => {
      if (!data) {
        return null;
      } else {
        this.setState({
          data: data,
          landskap: data.landskap
        });
      }

      if (!data.fylke || !data.kommune) {
        this.setState({
          fylke: "",
          kommune: ""
        });
      } else {
        this.setState({
          fylke: språk(data.fylke.tittel),
          kommune: språk(data.kommune.tittel)
        });
      }
      this.props.handleLokalitetUpdate(data);
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
