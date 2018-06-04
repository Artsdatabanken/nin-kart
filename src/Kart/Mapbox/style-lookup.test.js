import stylelookup from './style-lookup'

const map = {
  getLayer: function(layer) {
    return null
  },
}

test('stil NA', () => {
  expect(stylelookup(map, 'NA_T')).toMatchSnapshot()
})

test('stil RASTER', () => {
  expect(stylelookup(map, 'BS_6SO-RASTER')).toMatchSnapshot()
})
test('stil MI_KA', () => {
  expect(stylelookup(map, 'MI_KA')).toMatchSnapshot()
})
