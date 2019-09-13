import sysconfig from "Funksjoner/config";
export default function lagTemp(config) {
  if (!sysconfig.feature.comboSøk) return false;
  const l = {
    data: { source: "AND" },
    OR_MD: {
      data: { source: "AND" },
      draw: {
        points: {
          size: "function() { return (feature.size) * 3 }",
          texture: "/blue.png"
          //          'https://firebasestorage.googleapis.com/v0/b/grunnkart.appspot.com/o/bilde%2Favatar%2F40%2FOR_MD.png?alt=media',
        }
      }
    }
  };
  config.layers.AND = l;
  config.sources.AND = {
    type: "GeoJSON",
    //    url: `http://localhost:8000/dekning.geojson?kode=MI_KA-A&kode=NA_I1`,
    url: `http://localhost:8000/dekning.geojson?kode=NA_I1&kode=MI_KA-B`
  };
}
