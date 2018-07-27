import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() })

jest.mock('@material-ui/core/internal/EnhancedSwitch')
jest.mock('@material-ui/core/internal/Tooltip')

jest.mock('./Kart/LeafletTangram', () => 'tangram')
