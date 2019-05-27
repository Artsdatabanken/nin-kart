import prettyprint from "./prettyprint";

test("default-farge", () => {
  expect(prettyprint.prettyPrintAreal("")).toBe("");
  expect(prettyprint.prettyPrintAreal(100)).toBe("100 m²");
  expect(prettyprint.prettyPrintAreal(1001)).toBe("1001 m²");
  expect(prettyprint.prettyPrintAreal(34560)).toBe("34560 m²");
  expect(prettyprint.prettyPrintAreal(345600)).toBe("0.3 km²");
  expect(prettyprint.prettyPrintAreal(3456000)).toBe("3.5 km²");
});
