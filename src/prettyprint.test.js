import prettyprint from './prettyprint'

const dummyMeta = {
  farge: '#B0BB0B',
}

test('default-farge', () => {
  expect(prettyprint.prettyPrintAreal('')).toBe('')
  expect(prettyprint.prettyPrintAreal(100)).toBe('100 m²')
  expect(prettyprint.prettyPrintAreal(1001)).toBe('1 km²')
})
