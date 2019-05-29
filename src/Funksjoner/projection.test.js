import { wgs84ToUtm33, createBboxFromPoint } from "Funksjoner/projection";

const utm33 = wgs84ToUtm33(13, 66);
test("wgs84ToUtm33", () => {
  expect(utm33.x).toBe(409239.19818668056);
  expect(utm33.y).toBe(7321357.365459606);
});
