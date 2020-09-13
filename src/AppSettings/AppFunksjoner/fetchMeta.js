import redirectTo from "./redirectTo";
import updateHistory from "./updateHistory";

export default function fetchMeta(location, place) {
  let url = location.match(/\/(.*)/);

  place.setState({ meta: null });
  if (location === "/hjelp" || location === "/hjelp") {
    return;
  }
  if (!url || url.length !== 2) return;
  const path = "/" + url[1];
  place.downloadMeta(path).then((data) => {
    if (!data) {
      place.setState({ searchFor: path });
      return;
    }
    if (data.se) {
      const newUrl = data.se[Object.keys(data.se)[0]].sti;
      redirectTo(newUrl);
      return;
    }
    filterUnreleased(data.kart);
    place.setState({ meta: data, opplystKode: "", opplyst: {} });
    updateHistory(place.state, place);
    place.handleShowCurrent("false");
  });
}

function filterUnreleased(kart) {
  const visUpublisert = parseInt(localStorage.visUpublisert) || 0;
  const kf = {};
  Object.keys(kart.format).forEach((fkey) => {
    const format = kart.format[fkey];
    if ((format.publish || 0) + visUpublisert >= 0) kf[fkey] = format;
  });
  kart.format = kf;
}
