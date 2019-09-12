import React from "react";

const KatalogHeaderImage = ({ meta }) => {
  if (!meta) return null;
  const { bilde, url } = meta;
  /*
  Contains Header image only.
  */
  let new_url = "no_image";
  let new_flagg = "no_flagg";

  if (bilde.foto != null) {
    new_url = bilde.foto.url;
  }

  if (bilde.flagg != null) {
    new_flagg = bilde.logo.url;
  }

  if (meta.tittel.nb === "Administrativ grense") {
    new_url = "/bilder/norge.png";
  }

  let classes = "sidebar_top_image";
  let flagg_classes = "sidebar_top_image trasparent_image";

  if (url.indexOf("Datakilde") !== -1) {
    new_url = "https://data.artsdatabanken.no/" + url + "/logo_408.png";
  }

  return (
    <>
      <div
        className={classes}
        style={
          (new_url !== "no_image" && {
            backgroundImage: "url(" + new_url + ")",
            backgroundRepeat: "no-repeat"
          }) || { height: 0 }
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
