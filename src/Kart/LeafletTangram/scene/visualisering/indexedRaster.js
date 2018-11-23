import sysconfig from '../../../../config'

function drawAll(drawArgs) {
  const layer = {
    data: { source: drawArgs.kode },
    [drawArgs.kode]: {
      data: { source: drawArgs.forelderkode },
      draw: {
        raster: {
          order: 700,
        },
      },
    },
  }
  return layer
}

function lagStyle(viz, drawArgs) {
  const { kode, opplystKode } = drawArgs
  const palettKode = opplystKode || kode
  const gradient = {
    base: 'raster',
    blend: 'multiply',
    filtering: 'nearest',
    shaders: {
      uniforms: {
        palette: `https://maps.artsdatabanken.no/indexed/${palettKode}.palette.png`,
      },
      blocks: {
        global: `
          float unpack(vec4 h) {
            return (65535. * h.g + 255. * h.b + 0.5) / 512.;
          }`,
        color: `
           float v = unpack(sampleRaster(0));
           color = texture2D(palette, vec2(v, 0.5));
//           color.r = 1.-color.r;
          `,
      },
    },
  }
  return { name: 'raster', value: gradient }
}

function lagSource(kode, bbox, zoom) {
  const prefix = kode.substring(0, 2)
  const source = sysconfig.createTileSource(
    `indexed/${prefix}`,
    'Raster',
    zoom,
    bbox
  )
  return source
}

export default { drawAll, lagSource, lagStyle }
