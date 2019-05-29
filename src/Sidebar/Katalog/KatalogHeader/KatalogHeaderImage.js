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
  return (
    <div
      className={
        (erTransparent(url) && "sidebar_top_image  trasparent_image") ||
        "sidebar_top_image"
      }
      //onClick={this.handleOpen}
      style={
        (new_url !== "no_image" && {
          backgroundImage: "url(" + new_url + ")"
        }) || { height: 0 }
      }
      alt={"foto av " + språk(tittel)}
    />
  );
};
export default KatalogHeaderImage;
