import stylelookup from './style-lookup'

const map = {
  getLayer: function(layer) {
    return null
  },
}

test('stil NA', () => {
  expect(stylelookup(map, 'NA_T')).toMatchSnapshot()
})

test('stil FA', () => {
  expect(stylelookup(map, 'FA')).toBe(null)
})
test('stil MI_KA', () => {
  expect(stylelookup(map, 'MI_KA')).toMatchSnapshot()
})
