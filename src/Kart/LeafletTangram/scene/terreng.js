// @flow
import terrengmal from './mal/terreng'

function lagTerreng(lag, r) {
  console.log(lag)
  r['terreng'] = terrengmal
  console.log(r)
}

export { lagTerreng }
