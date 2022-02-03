const hack = (symbol, interval) => {
  return interval.match(/[<>]/) ? interval : symbol + " " + interval;
};

export const getInterval = interval => {
  console.log("rint", interval);
  if (!interval) return;
  if (!(interval.minTekst || interval.maxTekst)) return;
  if (!Array.isArray(interval)) interval = [interval];
  const items = interval.map(i => {
    if (!i.minTekst) return hack("<", i.maxTekst);
    if (!i.maxTekst) return hack(">", i.minTekst);
    return `${i.tittel ? i.tittel + " " : ""}${i.minTekst} - ${i.maxTekst}`;
  });
  const r = items.join(", ") + " " + (interval[0].måleenhet || "");
  console.log("r", r);
  return r;
};
