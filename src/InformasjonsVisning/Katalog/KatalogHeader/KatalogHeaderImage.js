import React from "react";

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

  let speciesimg = "https://data.artsdatabanken.no/" + url + "/phylopic_48.png";

  if (url.includes("Biota")) {
    backgroundSize = "cover";
  }

  return (
    <>
      <div
        className={classes}
        style={
          (speciesimg !== "no_image" && {
            backgroundSize: "40px",
            backgroundImage: "url(" + speciesimg + ")",
            backgroundRepeat: "repeat"
          }) || {
            height: 0
          }
        }
        alt=""
      >
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
      </div>

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
