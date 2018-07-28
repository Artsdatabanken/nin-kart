const seksjoner = {
  '6SE': {
    data: {
      source: 'og',
      layer: 'Seksjoner2017_4326-c6e9g5',
    },
    '6SE-1': {
      filter: {
        '6SE': 1,
      },
      draw: {
        _transparent: {
          order: 100,
          color: [62 / 255.0, 65 / 255.0, 254 / 255.0, 0.8],
        },
      },
    },
    '6SE-2': {
      filter: {
        '6SE': 2,
      },
      draw: {
        _transparent: {
          order: 100,
          color: [98 / 255.0, 129 / 255.0, 254 / 255.0, 0.8],
        },
      },
    },
    '6SE-3': {
      filter: {
        '6SE': 3,
      },
      draw: {
        _transparent: {
          order: 100,
          color: [133 / 255.0, 183 / 255.0, 254 / 255.0, 0.8],
        },
      },
    },
    '6SE-4': {
      filter: {
        '6SE': 4,
      },
      draw: {
        _transparent: {
          order: 100,
          color: [165 / 255.0, 218 / 255.0, 255 / 255.0, 0.9],
        },
      },
    },
    '6SE-5': {
      filter: {
        '6SE': 5,
      },
      draw: {
        _transparent: {
          order: 100,
          color: [202 / 255.0, 245 / 255.0, 254 / 255.0, 0.9],
        },
      },
    },
  },
}

export default seksjoner
