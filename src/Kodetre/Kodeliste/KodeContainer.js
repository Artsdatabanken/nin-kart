import React from "react";
import backend from "Funksjoner/backend";
import KodeVindu from "./KodeVindu";

// Informasjon om kode
class KodeContainer extends React.Component {
  dataQueryNumber = 0;
  state = { data: {} };

  componentDidUpdate(prevProps: Object, prevState: Object) {
    let oldKode = prevProps.kode;
    let oldBounds = prevProps.mapBounds;
    let newKode = this.props.kode;
    let newBounds = this.props.mapBounds;
    if (oldKode !== newKode || oldBounds !== newBounds) {
      //      this.fetchData(newKode, newBounds);
    }
  }

  fetchData(kode: String, bounds: Object) {
    this.dataQueryNumber++;
    const currentQuery = this.dataQueryNumber;
    if (!kode) return;
    backend.hentStatistikk(kode, bounds).then(data => {
      if (!data) data = {};
      if (currentQuery !== this.dataQueryNumber) return; // Abort stale query
      let størsteAreal = 0;
      if (data.barn)
        data.barn.forEach(b => {
          if (størsteAreal < b.areal) størsteAreal = b.areal;
        });
      data.størsteAreal = størsteAreal;
      this.setState({ data: data });
    });
  }

  render() {
    const data = this.state.data;
    const {
      meta,
      onNavigate,
      onMouseEnter,
      onMouseLeave,
      onFitBounds,
      erAktivert,
      opplyst,
      onToggleLayer,
      onUpdateLayerProp,
      onUpdateMetaProp,
      kurve
    } = this.props;
    return (
      <KodeVindu
        data={data}
        meta={meta}
        onNavigate={onNavigate}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onFitBounds={onFitBounds}
        erAktivert={erAktivert}
        opplyst={opplyst}
        onToggleLayer={onToggleLayer}
        onUpdateLayerProp={onUpdateLayerProp}
        onUpdateMetaProp={onUpdateMetaProp}
        kurve={kurve}
      />
    );
  }
}

export default KodeContainer;
