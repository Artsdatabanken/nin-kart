function flattenOne(data, current, path) {
  const key = path.shift();
  if (!current[key]) return;
  if (path.length > 0) {
    flattenOne(data, current[key].values, path);
    return;
  }
  const children = current[key].values;
  delete current[key];
  Object.entries(children).forEach(e => {
    const [key, value] = e;
    data[key] = value;
  });
}

export default function dataFlattening(data) {
  if (!data) return data;
  flattenOne(data, data, ["NA", "NA-LKM"]);
  flattenOne(data, data, ["NA", "NA-BS"]);
  return data;
}
