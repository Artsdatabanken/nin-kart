//import config from "Funksjoner/config";
/* Dumpet her fordi de per nå ikke ser ut til å brukes */

function finnButikkKode() {
  const { barn } = this.props;
  const fallback = {
    url: "Natur_i_Norge/Natursystem",
    tittel: "Natursystem"
  };
  let r = this.finnKodeHack(
    { values: barn },
    "NA",
    "Natursystem",
    "Natur_i_Norge"
  );
  if (r) return r;
  r = this.finnKodeHack({ values: barn }, "LA", "Landskap", "Natur_i_Norge");
  if (r) return r;
  return fallback;
}

function finnKodeHack(barn, subkey, tittel, url) {
  barn = barn.values[subkey];
  if (!barn || !barn.values) return null;
  for (let key of Object.keys(barn.values)) {
    if (key === "NA-KLG") continue;
    if (key === "NA-BS") continue;
    if (key === "NA-LKM") continue;
    if (key.indexOf("-E-") > 0) return;
    url = url + "/" + config.hackUrl(barn.title);
    const kode = this.finnKodeHack(barn, key, barn.title, url);
    if (kode) return kode;
    return {
      kode: key,
      tittel: barn.title,
      url: tempHackUrl(url)
    };
  }
}

function tempHackUrl(url) {
  url = url.replace(
    "Natur_i_Norge/Landskap",
    "Natur_i_Norge/Landskap/Typeinndeling"
  );
  url = url.replace(
    "Natur_i_Norge/Natursystem",
    "Natur_i_Norge/Natursystem/Typeinndeling"
  );
  return url;
}
