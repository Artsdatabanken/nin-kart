const fixerUpHack = (data) => {
  const moveKey = (key, target) => {
    data[target] = data[target] || {};
    const tn = data[target];
    tn.sample = tn.sample || {};
    tn.sample[key] = data[key];
    delete data[key];
  };
  Object.keys(data).forEach((key) => {
    const prefix = key.substring(0, 5);
    if (prefix === "NN-NA") moveKey(key, "natursystem");
    if (prefix === "NN-LA") moveKey(key, "landskap");
  });
  return data;
};

export default fixerUpHack;
