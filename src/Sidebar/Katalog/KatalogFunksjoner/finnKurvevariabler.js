function asn(lag, r) {
  if (!lag) return;
  if (!lag.kart) return;
  if (lag.kart.format.raster_gradient) r.gradient.push(lag);
  if (lag.kart.format.raster_ruter) r.punkt.push(lag);
}

export default function finnKurvevariabler(aktiveLag) {
  let r = { punkt: [], gradient: [] };
  for (const lag of Object.values(aktiveLag)) asn(lag, r);
  if (r.gradient.length === 0 && r.punkt.length === 0) return null;
  return r;
}
