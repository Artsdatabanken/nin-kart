import localStorageHelper from './localStorageHelper'

const dummyMeta = {
  farge: '#B0BB0B',
}

test('default-farge', () => {
  expect(localStorageHelper.getFargeKode('dummy')).toBe('#888888')
  expect(localStorageHelper.getFargeKode('dummy', dummyMeta)).toBe('#B0BB0B')
})
