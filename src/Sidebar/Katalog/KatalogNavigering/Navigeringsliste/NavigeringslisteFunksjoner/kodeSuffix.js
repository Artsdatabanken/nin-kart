import prettyKode from "Funksjoner/prettyKode";

export default function kodeSuffix(kode, parentkode) {
  let i = 0;
  while (parentkode[i] === kode[i]) i++;

  if ("0123456789".indexOf(kode[i]) >= 0) i -= 1;
  if (kode[i] === "-") i++;
  return prettyKode(kode.substring(i));
}
