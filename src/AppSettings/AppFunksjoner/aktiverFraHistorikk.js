export default function aktiverFraHistorikk(node) {
  if (!node.meta.kart) return;
  const nyttLag = node.meta;
  nyttLag.visBarn = node.meta.barn.length > 0;
  nyttLag.kanSlettes = true;
  let aktive = node.aktiveLag;
  aktive[nyttLag.kode] = nyttLag;
  return aktive;
}
