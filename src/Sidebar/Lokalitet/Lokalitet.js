import React, { Component } from "react";
import backend from "Funksjoner/backend";
import Borring from "./Visning/Borring";
import LokalitetHeader from "./Visning/LokalitetHeader";

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

  flattenOne(data, current, path) {
    const key = path.shift();
    if (!current[key]) return;
    if (path.length > 0) {
      this.flattenOne(data, current[key].values, path);
      return;
    }
    const children = current[key].values;
    delete current[key];
    Object.entries(children).forEach(e => {
      const [key, value] = e;
      data[key] = value;
    });
  }

  flattenData(data) {
    if (!data) return data;
    this.flattenOne(data, data, ["NA", "NA-LKM"]);
    this.flattenOne(data, data, ["NA", "NA-BS"]);
    return data;
  }

  render() {
    const { lat, lng, vis } = this.props;
    if (!lat) return null;
    const { data, sted } = this.state;
    const borrehull = data;
    const barn = this.flattenData(borrehull);
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
        <Borring barn={this.state.bareAktive ? {} : andreBarn} />
      </div>
    );
  }
}

export default Lokalitet;
