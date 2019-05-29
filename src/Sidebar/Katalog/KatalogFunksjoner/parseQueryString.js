export default function parseQueryString(query) {
  query = query.substring(1).split("&");
  return query.reduce((obj, item) => {
    const [key, value] = item.split("=");
    obj[key] = value;
    return obj;
  }, {});
}
