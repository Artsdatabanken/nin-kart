export default function prep(stats, grad) {
  if (!stats) return grad;
  return stats.map((y, i) => y / (grad[i] || 1));
}
