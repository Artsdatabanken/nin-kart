export default function språk(meta) {
  if (!meta) return "";
  if (typeof meta === "string") return meta;
  const keys = Object.keys(meta);
  if (!keys || keys.length === 0) return meta;

  if (keys.length === 1) return meta[keys[0]];
  //  if (meta.la) return `${meta.nb} (${meta.la})`;
  if (meta.nb) return `${meta.nb}`;
  return meta[keys[0]];
}
