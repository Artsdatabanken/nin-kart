/* 
Her ligger filtreringen som aktivt skjuler datasettene fra miljødirektoratet mens de 
kvalitetssikres. 
*/

export default function sladd(url) {
  if (!url) return false;
  if (url.indexOf("Terreng") >= 0) return false;
  if (url.indexOf("Regional_naturvariasjon") >= 0) return false;
  if (url.indexOf("Erosjon") >= 0) return false;
  if (url.indexOf("Finmat") >= 0) return false;
  if (url.indexOf("Sediment") >= 0) return false;
  if (url.indexOf("Ultrama") >= 0) return false;
  if (url.indexOf("Kalk") >= 0) return false;
  if (url.indexOf("Natur_i_Norge/Natursystem") >= 0) return true;
  return false;
}
