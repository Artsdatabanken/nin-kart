export default function språk(meta) {
  const keys = Object.keys(meta)
  if (!keys || keys.length === 0) return ''

  if (keys.length === 1) return meta[keys[0]]
  else if (meta.la) {
    return `${meta.nb} (${meta.la})`
  } else if (meta.nb) {
    return `${meta.nb}`
  } else {
    return meta[keys[0]]
  }
}
