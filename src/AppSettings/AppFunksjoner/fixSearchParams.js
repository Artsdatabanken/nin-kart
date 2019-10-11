export default function fixSearchParams(path) {
  const searchparams = path.split("?");
  let url_string = "";
  for (let i in searchparams) {
    const item = searchparams[i];
    if (!item.includes("lng") && item !== "undefined" && item !== "") {
      url_string += "?" + item;
    }
  }
  return url_string;
}
