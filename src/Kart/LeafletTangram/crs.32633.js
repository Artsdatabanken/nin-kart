import L from "leaflet";

/*
 * @namespace CRS
 * @crs L.CRS.32633
 *
 * A CRS that maps from UTM zone 33 coordinates to `x` and `y`.
 */

/*
xmin: -2500000
ymin: 3500000
xmax: 3045984
ymax: 9045984
*/

const bounds = {
  xmin: -2500000,
  ymin: 3500000,
  xmax: 3045984,
  ymax: 9045984
};

const scale = {
  x: 256 / (bounds.xmax - bounds.xmin),
  y: 256 / (bounds.ymax - bounds.ymin)
};

/*
9045984+250000=9295984
11295982.178109124+250000=11545982.178109
11545982.178109/9295984=1.24204
1.24204*245.9335
    -bounds.xmin* scale.x,
    -bounds.ymin * scale.y
Object { lat: 2843043808, lng: -2500000 }
Object { lat: 3500000.0000000005, lng: 2837043808 }

Object { lat: 2843043808, lng: -24999999.999999996 }
Object { lat: 3500000.0000000005, lng: 28370438079.999996 }

Object { lat: 2843043808, lng: -25000 }
Object { lat: 3500000.0000000005, lng: 28370438.08 }
*/

const CRS32633 = L.Util.extend({}, L.CRS.Simple, {
  projection: L.Projection.LonLat,
  transformation: L.transformation(
    scale.x,
    //0, //    (bounds.xmax - bounds.xmin) / 2, //
    bounds.xmin * scale.x,
    -scale.y,
    //0 //
    (bounds.ymax - bounds.ymin) / 2
    //bounds.ymax * scale.y
  ),

  scale: function(zoom) {
    return Math.pow(2, zoom);
  },

  zoom: function(scale) {
    return Math.log(scale) / Math.LN2;
  },

  distance: function(latlng1, latlng2) {
    var dx = latlng2.lng - latlng1.lng,
      dy = latlng2.lat - latlng1.lat;

    return Math.sqrt(dx * dx + dy * dy);
  },

  infinite: true
});

export default CRS32633;
