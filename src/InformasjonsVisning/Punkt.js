import React, { Component } from "react";
import backend from "Funksjoner/backend";
import Geografi from "./Lokalitet/LokalitetElement/Geografi";
import Landskap from "./Landskap";

const fixerUpHack = (data) => {
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
  return data;
};

class Punkt extends Component {
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
      sted: null,
      gammelData: null,
      fylke: null,
      kommune: null,
      landskap: null,
    });

    console.log({ lng, lat });
    backend.hentStedsnavn(lng, lat).then((sted) => {
      console.log({ sted });
      this.setState({ sted });
    });

    backend.hentPunktVektor(lng, lat).then((data) => {
      delete data.KOM;
      delete data.FYL;
      console.log({ data });
      //            this.props.handleLokalitetUpdate(data);
    });
    backend.hentPunkt(lng, lat).then((data) => {
      data = fixerUpHack(data);
      this.setState({
        fylke: data.fylke,
        kommune: data.kommune,
        landskap: data.landskap,
      });
      //            this.props.handleLokalitetUpdate(data);
    });
  }

  render() {
    const { lat, lng, aktivTab, onNavigate } = this.props;
    if (!lat) return null;
    const { fylke, kommune, sted, landskap } = this.state;
    return (
      <>
        <div
          className={
            (aktivTab === "informasjon" ? "mobile_on" : "mobile_off") +
            " main_bodyx"
          }
        >
          <Geografi
            sted={sted}
            fylke={fylke}
            kommune={kommune}
            lat={lat}
            lng={lng}
            onNavigate={onNavigate}
          />
          <Landskap landskap={landskap} />
        </div>
        <div className="big_page_sidebar" />
      </>
    );
  }
}

export default Punkt;
