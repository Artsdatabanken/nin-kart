import config from "../../../../config";

function drawAll({ kode, barn, opplystKode, bbox, zoom, sourceType }) {
  const layer = {
    data: { source: kode }
  };
  barn.forEach(barnet => {
    const { kode: barnkode, farge, url } = barnet;
    layer[barnkode] = draw({
      kode: barnkode,
      url: url,
      forelderkode: kode,
      farge: farge,
      opplystKode: opplystKode
    });
  });
  return layer;
}

function draw(args) {
  let { kode, url, forelderkode, opplystKode } = args;
  const size = opplystKode ? (opplystKode === kode ? "75%" : "0%") : "50%";
  const layer = {
    data: { source: kode },
    draw: {
      points: {
        size: size,
        collide: false,
        texture: `${config.storageUrl}${url}/avatar_40.png`
      }
    }
  };
  if (kode !== forelderkode) layer.filter = { kode: kode };
  return layer;
}

function lagSource({ url, zoom }, bbox) {
  const source = {
    type: "GeoJSON",
    url: url
  };
  return source;
}

export default { drawAll, lagSource };
