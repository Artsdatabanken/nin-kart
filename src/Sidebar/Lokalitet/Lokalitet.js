import React, { Component } from "react";
import backend from "Funksjoner/backend";
import LokalitetInnhold from "./LokalitetElementer/LokalitetInnhold/LokalitetInnhold";
import LokalitetHeader from "./LokalitetElementer/LokalitetHeader/LokalitetHeader";
import dataFlattening from "Sidebar/Lokalitet/LokalitetFunksjoner/dataFlattening";
import flatten from "./LokalitetFunksjoner/flatten";

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
    backend.hentPunkt(lng, lat).then(data => {
      this.setState({
        data: data["~"] ? data["~"].values : {}
      });
    });
    backend.hentStedsnavn(lng, lat).then(sted => {
      this.setState({ sted: sted });
    });
  }

  render() {
    const { lng, lat, aktivTab, history } = this.props;
    if (!lat) return null;
    const { data } = this.state;
    const barn = dataFlattening(data);
    if (!barn) return null;
    const { AO, prefix, ...andreBarn } = barn;
    if (!AO) return null; // Har du klikket i havet?
    const { fylke, kommune } = flatten(AO.values);
    history.push(
      "/Fylke/" + fylke + "/" + kommune + "?lng=" + lng + "&lat=" + lat
    );

    return (
      <>
        <div
          className={
            (aktivTab === "informasjon" ? "mobile_on" : "mobile_off") +
            " main_body"
          }
        >
          <div className="main_body_wrapper">
            {AO && (
              <LokalitetHeader
                values={AO.values}
                sted={AO.sted}
                elevasjon={AO.elevasjon}
              />
            )}
          </div>
          <LokalitetInnhold barn={this.state.bareAktive ? {} : andreBarn} />
        </div>
      </>
    );
  }
}

export default Lokalitet;
