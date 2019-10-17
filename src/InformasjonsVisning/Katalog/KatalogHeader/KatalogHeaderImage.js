import React from "react";

const KatalogHeaderImage = ({ meta }) => {
  if (!meta) return null;
  const { bilde, url } = meta;
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

  if (url.includes("Biota") && new_url === "no_image") {
    new_url = "https://data.artsdatabanken.no/" + url + "/foto_408.jpg";
    backgroundSize = "cover";
    var image = new Image();
    image.src = new_url;
    if (image.height === 0) {
      new_url = "https://data.artsdatabanken.no/" + url + "/phylopic_48.png";
      backgroundRepeat = "repeat";
      backgroundSize = "30px";
    }
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
