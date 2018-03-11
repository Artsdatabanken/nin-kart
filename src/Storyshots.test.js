import initStoryshots from '@storybook/addon-storyshots'

jest.mock('material-ui/internal/Tooltip')
jest.mock('material-ui/MenuItem')
jest.mock('./backend')

var localStorageMock = (function() {
  var store = {}
  return {
    getItem: function(key) {
      return store[key]
    },
    setItem: function(key, value) {
      store[key] = value.toString()
    },
    clear: function() {
      store = {}
    },
    removeItem: function(key) {
      delete store[key]
    },
  }
})()
Object.defineProperty(window, 'localStorage', { value: localStorageMock })

initStoryshots()
