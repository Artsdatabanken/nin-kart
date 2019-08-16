export default function aktiverFraHistorikk(aktive, node) {
  if (!node.meta.kart) return;
  const nyttLag = node.meta;
  nyttLag.visBarn = node.meta.barn.length > 0;
  nyttLag.kanSlettes = true;
  aktive[nyttLag.kode] = nyttLag;
  return aktive;
}
