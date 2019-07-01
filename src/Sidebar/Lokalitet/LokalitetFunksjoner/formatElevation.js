export default function formatElevation(elevation) {
  if (!elevation) return "";
  if (elevation < 0) return -elevation + " muh";
  return elevation + " moh";
}
