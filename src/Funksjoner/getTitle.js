import språk from "./språk";

function getTitle(meta) {
  let title = "";
  if (meta !== undefined && meta.tittel) {
    title = språk(meta.tittel);
    if (title === "undefined" && meta.tittel.sn) {
      return meta.tittel.sn;
    }
  }
  return title;
}

export default getTitle;
