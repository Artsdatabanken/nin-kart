import byggLag from "./byggLag";

function lagNåværendeLag(config, props) {
  const viserKatalog = !!props.meta; // meta = true or meta = false , never meta = null
  if (props.meta) {
    const metakode = props.meta.kode;
    const aktiv = props.aktiveLag[metakode];
    const erSynlig = aktiv ? aktiv.erSynlig : true;
    if (viserKatalog && erSynlig && props.show_current)
      // opplyst refererer til lag som lyser opp på hover
      byggLag(props.meta, props.opplyst, config);
  }
}

export default lagNåværendeLag;
