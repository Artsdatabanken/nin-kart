import lagEttLag from "./lagEttLag";

function lagAktiveLag(aktive, viserKatalog, opplyst, config) {
  Object.keys(aktive).forEach(kode =>
    lagEttLag(aktive[kode], opplyst, viserKatalog, config)
  );
}

export default lagAktiveLag;
