export default function aktiverValgtKartlag(props, aktive) {
  if (!props.kart) return;
  const nyttLag = JSON.parse(JSON.stringify(props));
  nyttLag.visBarn = props.barn.length > 0;
  nyttLag.kanSlettes = true;
  aktive[nyttLag.kode] = nyttLag;
  return aktive;
}
