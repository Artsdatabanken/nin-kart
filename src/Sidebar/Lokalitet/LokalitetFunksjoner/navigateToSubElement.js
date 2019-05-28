import backend from "Funksjoner/backend";

function updateName(kode) {
  /* 
  - Formerly known as "hack"
  - Replaces wrong code associations. 
  @Bjørn <- Er den ennå nødvendig? 

  */
  if (kode.startsWith("NA-LKM")) return kode;
  if (kode.startsWith("NA-BS")) return kode;
  if (kode.startsWith("LA-KLG")) return kode;
  if (kode.startsWith("LA-MP")) return kode;
  kode = kode.replace("LA-", "NN-LA-TI-");
  kode = kode.replace("NA-", "NN-NA-TI-");
  return kode;
}

function getInnerMostSingleChild(kode, node) {
  // Recursively look up the deepest single child node
  if (!node.values) return kode;
  const keys = Object.keys(node.values);
  if (keys.length !== 1) return kode;
  return getInnerMostSingleChild(keys[0], node.values[keys[0]]);
}

export default function navigateToSubElement(kode, node, history) {
  // Navigates to the deepest single child node, and pushes it to history
  kode = getInnerMostSingleChild(kode, node);
  kode = updateName(kode);
  backend.søk(kode).then(json => {
    // TODO: Mofify lat,lon query API to return URLs
    let hit = json.result[0];
    for (const r of json.result) {
      if (r.kode.endsWith(kode)) hit = r;
    }
    if (hit) history.push("/" + hit.url);
  });
}
