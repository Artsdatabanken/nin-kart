import React from "react";
import config from "../../../Funksjoner/config";

const KatalogHeaderImage = ({ meta }) => {
  if (!meta) return null;
  const { bilde = {}, url } = meta;
  /*
  Contains Header image only.
  */
  let new_url = "no_image";
  let new_flagg = "no_flagg";
  let backgroundRepeat = "no-repeat";
  let backgroundSize = "auto";

  if (bilde.foto != null) {
    new_url = bilde.foto.url;
  }

  if (bilde.flagg != null) {
    new_flagg = bilde.flagg.url;
  }

  if (meta.tittel.nb === "Administrativ grense") {
    new_url = "/bilder/norge.png";
  }

  let classes = "sidebar_top_image";
  let flagg_classes = "sidebar_top_image trasparent_image";

  if (url.indexOf("Datakilde") !== -1) {
    new_url = config.logo(url, 408);
  }

  if (url.includes("Biota")) {
    backgroundSize = "cover";
  }

  return (
    <>
      <div
        className={classes}
        style={
          (new_url !== "no_image" && {
            backgroundSize: backgroundSize,
            backgroundImage: "url(" + new_url + ")",
            backgroundRepeat: backgroundRepeat
          }) || {
            height: 0
          }
        }
        alt=""
      />

      {false && (
        <div
          className={flagg_classes}
          style={{ backgroundImage: "url(" + new_flagg + ")" }}
          alt=""
        />
      )}
    </>
  );
};
export default KatalogHeaderImage;
