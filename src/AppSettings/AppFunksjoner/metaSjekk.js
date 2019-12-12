import redirectTo from "./redirectTo";

export default function metaSjekk(meta, parent) {
  if (!meta) return;
  if (!meta.tittel) {
    return redirectTo("Natur_i_Norge");
  }
  if (meta.se) return meta;
  meta.prefiks = meta.kode.replace("NN-", "").substring(0, 2);
  if (!meta.kart) meta.kart = {};
  if (!meta.kart.format) meta.kart.format = {};
  if (!meta.kart.aktivtFormat)
    meta.kart.aktivtFormat = Object.keys(meta.kart.format)[0];
  // barn = lag
  meta.barn = [];
  Object.values(meta.lag).forEach(lag => {
    meta.barn.push(...Object.values(lag));
  });

  meta.barn.forEach(b => (b.opacity = 0.9));
  meta.erSynlig = true;
}
