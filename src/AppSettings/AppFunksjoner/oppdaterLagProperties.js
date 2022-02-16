function childLayer(layer) {
  return layer.slice(0, layer.lastIndexOf("-")); // fjerner siste kodeledd
}

function setValue(node, key, value) {
  const parts = key.split(".");
  for (let i = 0; i < parts.length - 1; i++) {
    node = node[parts[i]];
  }
  const vkey = parts[parts.length - 1];
  node[vkey] = value;
  return node;
}

function childElement(node, key, value, layer_input) {
  for (let i in node) {
    if (node[i].kode === layer_input) {
      setValue(node[i], key, value);
    }
  }
  return node;
}

export default function oppdaterLagProperties(
  layer,
  key,
  value,
  parent,
  elementType
) {
  const layer_input = layer;
  // Scenario A: Laget har ingen egenfarge, men bygges opp av underelementer
  // Scenario B: Laget har ingen underelementer, men sin egen farge

  // Laget er et underelement og ligger derfor som barn på sin foreldre
  if (elementType === "barn") {
    layer = childLayer(layer);
  }

  // Nåværende kartlag ligger i state.meta
  let currentnode = parent.state.meta;
  if (elementType === "barn") {
    currentnode = childElement(currentnode.barn, key, value, layer_input);
  } else {
    currentnode = setValue(currentnode, key, value);
  }

  // Laget er et aktivt kartlag, og ligger derfor også i state.aktive
  const aktive = parent.state.aktiveLag;
  let favenode = aktive[layer];
  if (favenode) {
    if (elementType === "barn") {
      favenode = childElement(favenode.barn, key, value, layer_input);
    } else {
      favenode = setValue(favenode, key, value);
    }
  }

  return aktive;
}
