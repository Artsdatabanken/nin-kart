export default function replaceString(verdi) {
  switch (verdi) {
    case "Bioklimatiske soner":
      return "Bioklimatisk sone";
    case "Bioklimatiske seksjoner":
      return "Bioklimatisk seksjon";
    default:
      return verdi;
  }
}
