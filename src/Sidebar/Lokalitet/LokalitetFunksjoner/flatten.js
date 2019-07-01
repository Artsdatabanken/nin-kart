export default function flatten(values) {
  const fn = Object.values(values)[0];
  const kn = Object.values(fn.values)[0];
  return { fylke: fn.title, kommune: kn.title };
}
