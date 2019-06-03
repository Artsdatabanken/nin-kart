function hack(symbol, intervall) {
  return intervall.match(/[<>]/) ? intervall : symbol + " " + intervall;
}

export default function getSecondary(meta) {
  let { intervall } = meta;
  if (!intervall) return;
  if (!(intervall.minTekst || intervall.maxTekst)) return;
  if (!Array.isArray(intervall)) intervall = [intervall];
  const items = intervall.map(i => {
    if (!i.minTekst) return hack("<", i.maxTekst);
    if (!i.maxTekst) return hack(">", i.minTekst);
    return `${i.tittel ? i.tittel + " " : ""}${i.minTekst} - ${i.maxTekst}`;
  });
  const r = items.join(", ") + " " + (intervall[0].måleenhet || "");
  return r;
}
