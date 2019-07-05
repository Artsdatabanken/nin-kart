import React from "react";
import språk from "Funksjoner/språk";

function erTransparent(url) {
  if (url.startsWith("Fylke")) return true;
  if (url.startsWith("Datakilde/")) return true;
  return false;
}

const KatalogHeaderImage = ({ meta }) => {
  if (!meta) return null;
  const { url, tittel, bilde } = meta;
  /*
  Contains Header image only.
  */
  let new_url = "no_image";
  if (bilde.foto != null) {
    new_url = bilde.foto.url;
  }

  let classes = "sidebar_top_image";
  if (språk(tittel) === "Landskapsgradient") {
    classes += "  wide_image";
  }
  if (erTransparent(url)) {
    classes += "  trasparent_image";
  }

  return (
    <div
      className={classes}
      //onClick={this.handleOpen}
      style={
        (new_url !== "no_image" && {
          backgroundImage: "url(" + new_url + ")"
        }) || { height: 0 }
      }
      alt=""
    />
  );
};
export default KatalogHeaderImage;
