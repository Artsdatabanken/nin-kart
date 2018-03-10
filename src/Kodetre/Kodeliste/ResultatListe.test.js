import ResultatListe from './ResultatListe'

test('Highlight', () => {
  expect(ResultatListe.highlightMatch('Karmøy', 'ka k')).toMatchSnapshot()
})
