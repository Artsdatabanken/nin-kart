function wgs84ToUtm33(latitude, longitude) {
  var deg2Rad = Math.PI / 180;
  var a = 6378137;
  var eccSquared = 0.00669438;
  var k0 = 0.9996;
  var longOrigin;
  var eccPrimeSquared;
  var n, T, c, aRenamed, m;
  var longTemp =
    latitude + 180 - parseInt((latitude + 180) / 360, 10) * 360 - 180;
  var latRad = longitude * deg2Rad;
  var longRad = longTemp * deg2Rad;
  var longOriginRad;

  var zoneNumber = 33;

  longOrigin = (zoneNumber - 1) * 6 - 180 + 3;
  longOriginRad = longOrigin * deg2Rad;
  eccPrimeSquared = eccSquared / (1 - eccSquared);
  n = a / Math.sqrt(1 - eccSquared * Math.sin(latRad) * Math.sin(latRad));
  T = Math.tan(latRad) * Math.tan(latRad);
  c = eccPrimeSquared * Math.cos(latRad) * Math.cos(latRad);
  aRenamed = Math.cos(latRad) * (longRad - longOriginRad);
  m =
    a *
    ((1 -
      eccSquared / 4 -
      (3 * eccSquared * eccSquared) / 64 -
      (5 * eccSquared * eccSquared * eccSquared) / 256) *
      latRad -
      ((3 * eccSquared) / 8 +
        (3 * eccSquared * eccSquared) / 32 +
        (45 * eccSquared * eccSquared * eccSquared) / 1024) *
        Math.sin(2 * latRad) +
      ((15 * eccSquared * eccSquared) / 256 +
        (45 * eccSquared * eccSquared * eccSquared) / 1024) *
        Math.sin(4 * latRad) -
      ((35 * eccSquared * eccSquared * eccSquared) / 3072) *
        Math.sin(6 * latRad));
  var utmEasting =
    k0 *
      n *
      (aRenamed +
        ((1 - T + c) * aRenamed * aRenamed * aRenamed) / 6 +
        ((5 - 18 * T + T * T + 72 * c - 58 * eccPrimeSquared) *
          aRenamed *
          aRenamed *
          aRenamed *
          aRenamed *
          aRenamed) /
          120) +
    500000.0;
  var utmNorthing =
    k0 *
    (m +
      n *
        Math.tan(latRad) *
        ((aRenamed * aRenamed) / 2 +
          ((5 - T + 9 * c + 4 * c * c) *
            aRenamed *
            aRenamed *
            aRenamed *
            aRenamed) /
            24 +
          ((61 - 58 * T + T * T + 600 * c - 330 * eccPrimeSquared) *
            aRenamed *
            aRenamed *
            aRenamed *
            aRenamed *
            aRenamed *
            aRenamed) /
            720));
  if (longitude < 0) utmNorthing += 10000000.0;
  return { x: utmEasting, y: utmNorthing };
}

export { wgs84ToUtm33 };
