export default function oppdaterLagProperties(layer, key, value, parent) {
  /*
  console.log(
    "oppdaterLagProperties",
    "layer",
    layer,
    "key",
    key,
    "value",
    value
  );*/
  const aktive = parent.state.aktiveLag;
  let node = aktive[layer];
  if (!node) node = parent.state.meta;
  const parts = key.split(".");
  for (let i = 0; i < parts.length - 1; i++) node = node[parts[i]];
  const vkey = parts[parts.length - 1];
  node[vkey] = value;
  return aktive;
}
