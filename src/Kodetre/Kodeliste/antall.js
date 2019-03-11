function antall(count, singularSuffix, pluralSuffix) {
  return count + " " + (count === 1 ? singularSuffix : pluralSuffix);
}

export default antall;
