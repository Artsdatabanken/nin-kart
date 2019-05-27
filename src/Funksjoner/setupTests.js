import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import backend from "Funksjoner/backend";

configure({ adapter: new Adapter() });

//jest.mock('@material-ui/core/Tooltip')
jest.mock("@material-ui/lab/Slider");
jest.mock("@material-ui/core/Button");
jest.mock("@material-ui/core/Drawer");
jest.mock("@material-ui/core/TextField", () => "TextField");
jest.mock("@material-ui/core/Tooltip");
jest.mock("@material-ui/core/MenuItem");
jest.mock("backend", () => () => ({}));

jest.mock("./Kart/LeafletTangram", () => "tangram");
jest.mock("tangram/dist/tangram.debug", () => "tangram");

var localStorageMock = (function() {
  var store = {};
  return {
    getItem: function(key) {
      return store[key];
    },
    setItem: function(key, value) {
      store[key] = value.toString();
    },
    clear: function() {
      store = {};
    },
    removeItem: function(key) {
      delete store[key];
    }
  };
})();

global.localStorage = localStorageMock;
