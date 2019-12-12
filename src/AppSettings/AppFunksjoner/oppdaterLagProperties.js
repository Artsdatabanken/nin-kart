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

  // Laget er et aktivt kartlag, og ligger derfor i state.aktive
  const aktive = parent.state.aktiveLag;
  let node = aktive[layer];

  // Laget er nåværende kartlag, og ligger derfor i state.meta
  if (!node) {
    node = parent.state.meta;
  }

  if (elementType === "barn") {
    node = childElement(node.barn, key, value, layer_input);
  } else {
    node = setValue(node, key, value);
  }
  return aktive;
}

export { setValue };
