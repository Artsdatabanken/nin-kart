import redirectTo from "./redirectTo";
import updateHistory from "./updateHistory";

export default function fetchMeta(location, place) {
  let url = location.match(/\/(.*)/);
  place.setState({ meta: null });
  if (!url || url.length !== 2 || !url[1]) return;
  const path = url[1].replace(/katalog/i, "");
  place.downloadMeta(path).then(data => {
    if (!data) {
      place.setState({ searchFor: path });
      return;
    }
    if (data.se) {
      const newUrl = data.se[Object.keys(data.se)[0]].sti;
      redirectTo(newUrl);

      return;
    }
    place.setState({ meta: data, opplystKode: "", opplyst: {} });
    updateHistory(place.state, place);
    place.handleShowCurrent("false");
  });
}
