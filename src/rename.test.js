import rename from './rename'

const searchResultInput = [
  {
    kode: 'NA_F1-3',
    navn: {
      nb: 'kalkfattige klare elvevannmasser i stryk, fossestryk og fosser',
    },
    forelder: { kode: 'NA_F1', navn: { nb: 'Elvevannmasser' } },
  },
]
const searchResultOutput = [
  {
    kode: 'NA_F1-3',
    navn: {
      nb: 'Kalkfattige klare elvevannmasser i stryk, fossestryk og fosser',
    },
    forelder: { kode: 'NA_F1', navn: { nb: 'Elvevannmasser' } },
  },
]

test('foreslåtte renames', () => {
  expect(rename('ok')).toBe('ok')
})

test('rename from object array', () => {
  expect(JSON.stringify(rename(searchResultInput))).toBe(
    JSON.stringify(searchResultOutput)
  )
})
