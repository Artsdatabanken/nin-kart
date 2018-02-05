import PunktinformasjonContainer from './PunktinformasjonContainer'

var punktinformasjonContainer = new PunktinformasjonContainer()

test('fixStedsnavn', () => {
  expect(punktinformasjonContainer.fixStedsnavn({ result: 'nada' })).toBe(null)
})
