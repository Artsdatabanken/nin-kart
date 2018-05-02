import PunktinformasjonContainer from './PunktinformasjonContainer'
import backend from '../backend'

var punktinformasjonContainer = new PunktinformasjonContainer()

var createNatureAreaPointInfoName = 'NA_T32-C-3'
var createNatureAreaPointInfoValue = 'intermediær eng med mindre hevdpreg'

var naturAreaExpected = {
  name: createNatureAreaPointInfoName,
  value: createNatureAreaPointInfoValue,
  logo:
    'https://pbs.twimg.com/profile_images/378800000067455227/3d053db6b9593d47a02ced7709846522_400x400.png',
  homepage: 'http://www.miljodirektoratet.no/',
  dataorigin: 'MDIR',
  article: 'https://www.artsdatabanken.no/NiN2.0/T32-C-3',
}

var getNatureAreaFactsInput = {
  nivå: 'NA',
  surveyScale: '1 : 5000',
  surveyedFrom: 'juleAften',
  rødlisteKategori: 'LC',
  parameters: [
    {
      code: createNatureAreaPointInfoName,
      codeDescription: createNatureAreaPointInfoValue,
    },
  ],
  description: 'testdata',
}

var rødlisteExpected = {
  name: 'name',
  value: 'value',
  logo: backend.getCompanyLogo('ADB'),
  homepage: 'https://artsdatabanken.no/',
  dataorigin: 'ADB',
  article: 'https://www.artsdatabanken.no/rodlistefornaturtyper',
}

test('fixStedsnavn-NullTest', () => {
  expect(punktinformasjonContainer.fixStedsnavn({ result: 'nada' })).toBe(null)
})

test('fixStedsnavn', () => {
  expect(
    Object.keys(
      punktinformasjonContainer.fixStedsnavn({
        placename: 'huttiheita',
        stedsnummer: 42,
      })
    )[0]
  ).toBe('GEO_SN-42')
})

test('createNatureAreaPointInfo', () => {
  expect(
    punktinformasjonContainer.createNatureAreaPointInfo(
      createNatureAreaPointInfoName,
      createNatureAreaPointInfoValue
    ).article
  ).toBe(naturAreaExpected.article)
})

test('createRødlistePointInfo', () => {
  expect(
    punktinformasjonContainer.createRødlistePointInfo(
      rødlisteExpected.name,
      rødlisteExpected.value
    ).homepage
  ).toBe(rødlisteExpected.homepage)
})

test('fetch-noLocalid', () => {
  expect(punktinformasjonContainer.fetch(1, 1, undefined)).toBe(undefined)
})
