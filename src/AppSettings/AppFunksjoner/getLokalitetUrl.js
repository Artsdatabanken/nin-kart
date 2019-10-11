export default function getLokalitetUrl(lat, lng, data) {
  if (!data) return null;
  let url = "";
  if (data.fylke || data.kommune) {
    url = "/" + data.kommune.url + "/lokalitet?lng=" + lng + "&lat=" + lat;
  } else {
    url = "/Natur_i_Norge/lokalitet?lng=" + lng + "&lat=" + lat;
  }
  url = url.replace(/ /g, "_");
  if (url.substring(0, 2) === "//") {
    url = url.substring(1);
  }
  return url;
}
