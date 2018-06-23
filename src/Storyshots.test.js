import initStoryshots from '@storybook/addon-storyshots'

jest.mock('material-ui/internal/Tooltip')
jest.mock('material-ui/MenuItem')
jest.mock('./backend')

jest.mock('react-router-dom/withRouter', () => x => x)
jest.mock('react-router-dom/Route', () => 'Route')
jest.mock('react-router-dom/Switch', () => 'Switch')
jest.mock('react-router', () => ({
  Route: 'div',

  withRouter: x => x,
  Switch: 'div',
}))

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
