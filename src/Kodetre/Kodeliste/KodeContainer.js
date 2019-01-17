import React from "react";
import backend from "../../backend";
import KodeVindu from "./KodeVindu";

type State = {
  data: Object
};

type Props = {
  meta: Object,
  kode: String,
  mapBounds: Object,
  onFitBounds: Function,
  onMouseLeave: Function,
  onMouseEnter: Function,
  onNavigate: Function,
  onToggleLayer: Function,
  onUpdateMetaProp: Function,
  erAktivert: Boolean,
  opplystKode: String
};

// Informasjon om kode
class KodeContainer extends React.Component<Props, State> {
  dataQueryNumber = 0;
  state = { data: {} };

  componentDidUpdate(prevProps: Object, prevState: Object) {
    let oldKode = prevProps.kode;
    let oldBounds = prevProps.mapBounds;
    let newKode = this.props.kode;
    let newBounds = this.props.mapBounds;
    if (oldKode !== newKode || oldBounds !== newBounds) {
      this.fetchData(newKode, newBounds);
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
      opplystKode,
      onToggleLayer,
      onUpdateMetaProp
    } = this.props;
    if (!meta) return null;
    return (
      <KodeVindu
        data={data}
        meta={meta}
        onNavigate={onNavigate}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onFitBounds={onFitBounds}
        erAktivert={erAktivert}
        opplystKode={opplystKode}
        onToggleLayer={onToggleLayer}
        onUpdateMetaProp={onUpdateMetaProp}
      />
    );
  }
}

export default KodeContainer;
