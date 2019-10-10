function childLayer(layer) {
  return layer.slice(0, layer.lastIndexOf("-")); // fjerner siste kodeledd
}

function oppdaterLagProperties(layer, key, value, parent, elementType) {
  const layer_input = layer;
  // Scenario A: Laget har ingen egenfarge, men bygges opp av underelementer
  // Scenario B: Laget har ingen underelementer, men sin egen farge

  // *** Sette Lag ***

  // Laget er et underelement og ligger derfor som barn på sin foreldre
  if (elementType === "barn") {
    layer = childLayer(layer);
  }

  // Laget er et aktivt kartlag, og ligger derfor i state.aktive
  const aktive = parent.state.aktiveLag;
  let node = aktive[layer];

  // Laget er nåværende kartlag, og ligger derfor i state.meta
  if (!node) node = parent.state.meta;
  let newnode;
  if (elementType === "barn") {
    node = node.barn;

    for (var i in node) {
      if (node[i].kode === layer_input) {
        newnode = node[i];
      }
    }
    node = newnode;
  }
  //console.log(node);
  // *** Sette Key ***
  const parts = key.split(".");

  for (let i = 0; i < parts.length - 1; i++) {
    node = node[parts[i]];
  }

  const vkey = parts[parts.length - 1];
  node[vkey] = value;

  return aktive;
}

export default oppdaterLagProperties;
