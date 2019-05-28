import backend from "Funksjoner/backend";

/* Denne ser ut til å ikke være i bruk. */

export default function fetchKatalogData(kode, bounds) {
  // kode:string, bounds:object
  this.dataQueryNumber++;
  const currentQuery = this.dataQueryNumber;
  if (!kode) return;
  backend.hentStatistikk(kode, bounds).then(data => {
    if (!data) data = {};
    if (currentQuery !== this.dataQueryNumber) return; // Abort stale query
    let størsteAreal = 0;
    if (data.barn)
      data.barn.forEach(b => {
        if (størsteAreal < b.areal) størsteAreal = b.areal;
      });
    data.størsteAreal = størsteAreal;
    this.setState({ data: data });
  });
}
