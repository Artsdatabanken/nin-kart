export default function checkifItalics(what, sn) {
  if (
    (what === "Slekt" ||
      what === "Art" ||
      what === "Underart" ||
      what === "Varietet" ||
      what === "Underslekt") &&
    sn
  ) {
    return true;
  }
  return false;
}
