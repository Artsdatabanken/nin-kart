import byggLag from "./byggLag";

export default function lagEttLag(lag, opplyst, viserKatalog, config) {
  if (!lag.erSynlig && opplyst.kode !== lag.kode) return;
  byggLag(lag, opplyst, config, viserKatalog);
}
