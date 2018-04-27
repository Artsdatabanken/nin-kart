export default function språk(meta) {
  const keys = Object.keys(meta)
  if (keys.length === 1) return meta[keys[0]]

  return `${meta.nb} (${meta.la})`
}
