import Kodeliste from './Kodeliste'

const input = {
  T10: { sti: 'NA/T/10' },
  T30: { sti: 'NA/T/30' },
  T2: { sti: 'NA/T/2' },
  T1: { sti: 'NA/T/1' },
}

const expected = ['T1', 'T2', 'T10', 'T30']

test('sortering', () => {
  expect(Kodeliste.sorterNøkler(input)).toEqual(expected)
})
