export default function oppdaterMetaProperties(kode, key, value, parent) {
  // Supports composite keys i.e. gradient.filterMin
  const aktive = parent.state.meta;
  let node = aktive.barn[kode];
  const parts = key.split(".");
  for (let i = 0; i < parts.length - 1; i++) node = node[parts[i]];
  const vkey = parts[parts.length - 1];
  node[vkey] = value;
  aktive.barn[kode] = Object.assign({}, aktive.barn[kode]);
  return aktive;
}
