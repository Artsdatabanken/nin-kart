import tinycolor from 'tinycolor2'

const farger = {
  AO: 'hsl(0, 0%, 50%)',
  BS: 'hsl(240, 40%, 50%)',
  MI: 'hsl(32, 40%, 50%)',
  LA: 'hsl(190, 40%, 50%)',
  NA: 'hsl(120, 40%, 50%)',
  OR: 'hsl(0, 0%, 50%)',
  RL: 'hsl(12, 40%, 50%)',
  VV: 'hsl(300, 40%, 50%)',
}

const palett = {
  lys: {},
  mørk: farger,
}
Object.keys(farger).forEach(prefiks => {
  const lysFarge = tinycolor(farger[prefiks])
    .lighten(40)
    .setAlpha(0.95)
    .toHslString()
  palett.lys[prefiks] = lysFarge
})

export default palett
