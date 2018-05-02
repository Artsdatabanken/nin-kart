import backend from './backend'

test('default-logo', () => {
  expect(backend.getCompanyLogo('')).toBe(backend.getCompanyLogo('MDIR'))
})

test('biofokus-logo', () => {
  expect(backend.getCompanyLogo('biofokus')).toBe(
    'https://www.artsdatabanken.no/Media/F7355'
  )
})
