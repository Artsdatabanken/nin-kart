import prettyKode from "../../../Funksjoner/prettyKode";

export function kodeSuffix2(kode, overordnet) {
  if (overordnet.length <= 1) return "";
  const ti = overordnet.length - 3;
  const parentkode = overordnet[ti] || overordnet[0];
  return kodeSuffix(kode, parentkode.kode);
}

export default function kodeSuffix(kode, parentkode) {
  let i = 0;
  while (parentkode[i] === kode[i]) i++;

  if ("0123456789".indexOf(kode[i]) >= 0) i -= 1;
  if (kode[i] === "-") i++;
  return prettyKode(kode.substring(i));
}
