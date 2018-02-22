import { wgs84ToUtm33, createBboxFromPoint } from './projection'

const bbox = createBboxFromPoint(1, 2, 3)
test('CreateBboxFromPoint', () => {
  expect(bbox.minx).toBe(-1)
  expect(bbox.miny).toBe(-2)
  expect(bbox.maxx).toBe(5)
  expect(bbox.maxy).toBe(4)
})

const utm33 = wgs84ToUtm33(13, 66)
test('wgs84ToUtm33', () => {
  expect(utm33.x).toBe(409239.19818668056)
  expect(utm33.y).toBe(7321357.365459606)
})
