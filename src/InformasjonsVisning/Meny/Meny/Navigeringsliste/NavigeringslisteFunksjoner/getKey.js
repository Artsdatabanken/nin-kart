import språk from "Funksjoner/språk";

function getKey(node, sorterPåKode) {
  if (node.sortering) return node.sortering;
  if (sorterPåKode)
    return node.kode
      .replace("+", "Z")
      .split(/-/)
      .map(e => e.padStart(5, "0"));

  return språk(node.tittel);
}

export default getKey;
