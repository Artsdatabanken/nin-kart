import React from 'react'
import { shallow } from 'enzyme'
import Grunnkart from './Grunnkart'

test('Grunnkart', () => {
  const wrapper = shallow(<Grunnkart />)
  expect(wrapper).toMatchSnapshot()
})
