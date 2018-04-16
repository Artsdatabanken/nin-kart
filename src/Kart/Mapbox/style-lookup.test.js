import stylelookup from './style-lookup'

const map = {
  getLayer: function(layer) {
    return null
  },
}

test('stil NA', () => {
  expect(stylelookup(map, 'NA_T')).toMatchSnapshot()
})

test('stil MI_KA', () => {
  expect(stylelookup(map, 'MI_KA')).toMatchSnapshot()
})

test('stil toppNode', () => {
  expect(stylelookup(map, 'NA')).toMatchSnapshot()
})
