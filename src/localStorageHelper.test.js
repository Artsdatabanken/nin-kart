import localStorageHelper from './localStorageHelper'

const dummyMeta = {
  farge: '#B0BB0B',
}

test('default-farge', () => {
  expect(localStorageHelper.getFargeKode('dummy').values.rgb[0]).toBe(136)
  expect(
    localStorageHelper.getFargeKode('dummy', dummyMeta).values.rgb[0]
  ).toBe(176)
})
