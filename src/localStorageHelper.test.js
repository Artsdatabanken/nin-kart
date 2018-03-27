import localStorageHelper from './localStorageHelper'

const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn(),
}
global.localStorage = localStorageMock

const dummyMeta = {
  farge: '#B0BB0B',
  barn: { A: { farge: '#fff' } },
}

test('default-farge', () => {
  localStorageHelper.overrideFarger(dummyMeta)
  expect(dummyMeta.farge).toBe('#B0BB0B')
  expect(dummyMeta.barn.A.farge).toBe('#fff')
})
