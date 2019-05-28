import React, { Component } from "react";
import backend from "Funksjoner/backend";
import LokalitetInnhold from "./LokalitetElementer/LokalitetInnhold/LokalitetInnhold";
import LokalitetHeader from "./LokalitetElementer/LokalitetHeader/LokalitetHeader";
import dataFlattening from "Sidebar/Lokalitet/LokalitetFunksjoner/dataFlattening";

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
    const { lat } = this.props;
    if (!lat) return null;
    const { data } = this.state;
    const barn = dataFlattening(data);
    if (!barn) return null;
    const { AO, prefix, ...andreBarn } = barn;

    return (
      <div className="sidebar_top_area sidebar_background_element">
        <div className="sidebar_element page_topic_header" />
        <div className="sidebar_title_container sidebar_element">
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
    );
  }
}

export default Lokalitet;
