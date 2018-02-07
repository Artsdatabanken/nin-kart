import PunktinformasjonContainer from './PunktinformasjonContainer'

var punktinformasjonContainer = new PunktinformasjonContainer()

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
