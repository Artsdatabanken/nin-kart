const sources = {
  og: {
    type: 'MVT',
    url:
      'https://a.tiles.mapbox.com/v4/artsdatabanken.bthj0gsg,artsdatabanken.9fqc3l9i,artsdatabanken.7hhxtxe3,artsdatabanken.dz9161rw,artsdatabanken.0n0rw38p,artsdatabanken.0183w0w7,artsdatabanken.0hbp7082,artsdatabanken.7676pvsx,artsdatabanken.6j8o5925,artsdatabanken.6rbfhi3x,artsdatabanken.d1s080yu,artsdatabanken.2v0t4l8r/{z}/{x}/{y}.vector.pbf?access_token=pk.eyJ1IjoiYXJ0c2RhdGFiYW5rZW4iLCJhIjoiY2pjNjg2MzVzMHhycjJ3bnM5MHc4MHVzOCJ9.fLnCRyg-hCuTClyim1r-JQ',
    max_zoom: 16,
  },
  bs_6se: {
    type: 'MVT',
    url:
      'https://a.tiles.mapbox.com/v4/artsdatabanken.bthj0gsg,artsdatabanken.9fqc3l9i,artsdatabanken.7hhxtxe3,artsdatabanken.dz9161rw,artsdatabanken.0n0rw38p,artsdatabanken.0183w0w7,artsdatabanken.0hbp7082,artsdatabanken.7676pvsx,artsdatabanken.6j8o5925,artsdatabanken.6rbfhi3x,artsdatabanken.d1s080yu,artsdatabanken.2v0t4l8r/{z}/{x}/{y}.vector.pbf?access_token=pk.eyJ1IjoiYXJ0c2RhdGFiYW5rZW4iLCJhIjoiY2pjNjg2MzVzMHhycjJ3bnM5MHc4MHVzOCJ9.fLnCRyg-hCuTClyim1r-JQ',
    max_zoom: 16,
  },
  na: {
    type: 'MVT',
    url:
      'https://a.tiles.mapbox.com/v4/artsdatabanken.8z9eimla,artsdatabanken.bthj0gsg,artsdatabanken.9fqc3l9i,artsdatabanken.7hhxtxe3,artsdatabanken.dz9161rw,artsdatabanken.0n0rw38p,artsdatabanken.0183w0w7,artsdatabanken.0hbp7082,artsdatabanken.7676pvsx,artsdatabanken.6j8o5925,artsdatabanken.6rbfhi3x,artsdatabanken.d1s080yu,artsdatabanken.2v0t4l8r/{z}/{x}/{y}.vector.pbf?access_token=pk.eyJ1IjoiYXJ0c2RhdGFiYW5rZW4iLCJhIjoiY2pjNjg2MzVzMHhycjJ3bnM5MHc4MHVzOCJ9.fLnCRyg-hCuTClyim1r-JQ',
    url2:
      'https://a.tiles.mapbox.com/v4/artsdatabanken.8z9eimla/{z}/{x}/{y}.vector.pbf?access_token=pk.eyJ1IjoiYXJ0c2RhdGFiYW5rZW4iLCJhIjoiY2pjNjg2MzVzMHhycjJ3bnM5MHc4MHVzOCJ9.fLnCRyg-hCuTClyim1r-JQ',
  },

  'terrain-normals': {
    type: 'Raster',
    url2: 'https://tile.nextzen.com/nextzen/terrain/v1/normal/{z}/{x}/{y}.png',
    url3:
      'https://tile.nextzen.org/tilezen/terrain/v1/256/normal/{z}/{x}/{y}.png?api_key=Tqy6UAn9ShClyvfUon001g',
    url: 'http://localhost:8081/dummymap/',
  },
  mapzen: {
    url:
      'https://{s}.tile.nextzen.org/tilezen/vector/v1/512/all/{z}/{x}/{y}.mvt',
    url_subdomains: ['a', 'b', 'c', 'd'],
    url_params: {
      api_key: 'Tqy6UAn9ShClyvfUon001g',
    },
    tile_size: 512,
    max_zoom: 16,
    rasters: ['terrain-normals'],
  },
}

function createSources(aktivKode) {
  return sources
}

export { createSources }
