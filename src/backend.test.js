import backend from './backend'

const bbox = backend.CreateBboxFromPoint(1, 2, 3)
test('CreateBboxFromPoint', () => {
  expect(bbox.minx).toBe(-1)
  expect(bbox.miny).toBe(-2)
  expect(bbox.maxx).toBe(5)
  expect(bbox.maxy).toBe(4)
})
