import redirectTo from "./redirectTo";
import tinycolor from "tinycolor2";

function justerFarge(o) {
  const f = new tinycolor(o.farge);
  while (f.getLuminance() < 0.6) f.brighten(5);
  o.farge = f.toHexString();
}

export default function metaSjekk(meta, parent) {
  if (!meta) return;
  if (!meta.tittel) {
    return redirectTo("Natur_i_Norge");
  }
  if (meta.se) return meta;
  meta.prefiks = meta.kode.replace("NN-", "").substring(0, 2);
  if (!meta.kart) meta.kart = {};
  if (!meta.kart.format) meta.kart.format = {};
  if (!meta.kart.aktivtFormat)
    meta.kart.aktivtFormat = Object.keys(meta.kart.format)[0];
  justerFarge(meta);
  for (var barn of meta.barn) justerFarge(barn);

  if (meta.kart.format.raster_gradient) {
    const gradient = meta.kart.format.raster_gradient;
    gradient.aktivVisning = gradient.visning && gradient.visning[0];
    if (gradient.intervall) {
      meta.kart.aktivtFormat = "raster_gradient";
      const intervall = gradient.intervall.original;
      gradient.filterMin = intervall[0];
      gradient.filterMax = intervall[1];
    } else {
      //      meta.kart.aktivtFormat = "polygon";
      //    meta.farge0 = meta.farge;
      //   meta.farge = "rgba(255,255,255,0)";
      //  meta.farge = "#ff0";
      //   gradient.filterMin = 0;
      //   gradient.filterMax = 100;
      gradient.intervall = {
        original: [0, 100],
        normalisertVerdi: [0, 255],
      };
    }
  }
  if (meta.kode.indexOf("VV") === 0) meta.kart.aktivtFormat = "polygon";
  meta.erSynlig = true;
  meta.depth = 3;
  meta.barn = meta.barn.filter(
    (b) => "AR_RL".indexOf(b.kode.substring(0, 2)) < 0
  );
  if (meta.kode.substring(0, 2) === "LA") {
    if (!parent.state.aktiveLag.bakgrunnskart.terreng.wasAutoEnabled) {
      parent.handleUpdateLayerProp("bakgrunnskart.terreng", "erSynlig", true);
      parent.handleUpdateLayerProp(
        "bakgrunnskart.terreng",
        "wasAutoEnabled",
        true
      );
    }
  }
}
