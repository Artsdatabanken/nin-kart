import React, { Component } from "react";
import backend from "Funksjoner/backend";
import BorreAdapter from "./BorreAdapter";

class BorreContainer extends Component {
  state = {};

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
    const { lat, lng, vis } = this.props;
    if (!lat) return null;
    const { data, sted } = this.state;
    return (
      <BorreAdapter data={data} sted={sted} lat={lat} lng={lng} vis={vis} />
    );
  }
}

export default BorreContainer;
