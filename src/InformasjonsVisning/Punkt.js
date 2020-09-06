import React, { Component } from "react";
import backend from "Funksjoner/backend";
import Stedsinfo from "./Lokalitet/LokalitetElement/Stedsinfo";
import språk from "Funksjoner/språk";
import Landskap from "./Landskap";

const fixerUpHack = (data) => {
  console.log({ data });
  const moveKey = (key, target) => {
    data[target] = data[target] || {};
    const tn = data[target];
    tn.sample = tn.sample || {};
    tn.sample[key] = data[key];
    delete data[key];
  };
  Object.keys(data).forEach((key) => {
    const prefix = key.substring(0, 5);
    if (prefix === "NN-NA") moveKey(key, "natursystem");
    if (prefix === "NN-LA") moveKey(key, "landskap");
  });
  console.log({ data });
  return data;
};
// Eksisterende versjon
// TODO
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
      landskap: null,
    });

    // Stedsnavn
    backend.hentStedsnavn(lng, lat).then((sted) => {
      this.setState({ sted });
    });

    backend.hentPunkt(lng, lat).then((data) => {
      console.log("hent", data);

      data = fixerUpHack(data);
      this.setState({
        data: data,
        landskap: data.landskap,
      });

      if (!data.fylke || !data.kommune) {
        this.setState({
          fylke: "",
          kommune: "",
        });
      } else {
        this.setState({
          fylke: språk(data.fylke.tittel),
          kommune: språk(data.kommune.tittel),
        });
      }
      //            this.props.handleLokalitetUpdate(data);
    });
  }

  render() {
    const { lat, lng, aktivTab, onNavigate } = this.props;
    if (!lat) return null;
    const { fylke, kommune, landskap } = this.state;
    return (
      <>
        <div
          className={
            (aktivTab === "informasjon" ? "mobile_on" : "mobile_off") +
            " main_bodyx"
          }
        >
          <Stedsinfo
            sted={this.state.sted}
            fylke={fylke}
            kommune={kommune}
            lat={lat}
            lng={lng}
          />
          <Landskap landskap={landskap} />
        </div>
        <div className="big_page_sidebar" />
      </>
    );
  }
}

export default Lokalitet;
