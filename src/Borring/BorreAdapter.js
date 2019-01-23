import React, { Component } from "react";
import BorreVindu from "./BorreVindu";

class BorreAdapter extends Component {
  hackInnSted(sted, data) {
    if (!sted) return data;
    if (!data) return data;
    data.AO = data.AO || {};
    let ao = data.AO;
    ao.sted = sted.placename;
    ao.elevasjon = sted.elevation;
    return data;
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
    const { data, sted, lat, lng, view } = this.props;
    const borrehull = this.hackInnSted(sted, data);
    const flattened = this.flattenData(borrehull);
    return <BorreVindu lat={lat} lng={lng} view={view} barn={flattened} />;
  }
}

export default BorreAdapter;
