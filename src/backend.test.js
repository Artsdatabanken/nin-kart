import backend from './backend'

test('default-logo', () => {
  expect(backend.getCompanyLogo('')).toBe(backend.getCompanyLogo('MDIR'))
})
