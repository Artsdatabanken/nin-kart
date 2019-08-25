const expo = (y, log) => (log ? Math.log10(y + 1) : y);

export default function normaliser(stats, logY) {
  let ymax = 0;
  let ymax2 = 0;
  for (var sample of stats) {
    const v = expo(sample, logY);
    ymax = Math.max(ymax, v);
    if (v < ymax) ymax2 = Math.max(ymax2, v);
  }
  const scaler = 1.0 / (0.2 * ymax + 0.8 * ymax2);
  const r = stats.map(y => Math.min(100, 100 * expo(y, logY) * scaler));
  return { fordeling: r, max: ymax };
}
