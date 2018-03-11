import stylelookup from './style-lookup'

const map = {
  getLayer: function(layer) {
    return null
  },
}

test('lag stiler', () => {
  expect(stylelookup(map, 'NA_T')).toMatchSnapshot()
})
