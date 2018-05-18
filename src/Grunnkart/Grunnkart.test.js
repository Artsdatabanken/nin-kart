import React from 'react'
import { shallow } from 'enzyme'
import Grunnkart from './Grunnkart'

test('Grunnkart', () => {
  const onQueryChange = jest.fn()

  const wrapper = shallow(<Grunnkart />)
  expect(wrapper).toMatchSnapshot()
  wrapper.setProps({ visValgte: true })
  expect(wrapper).toMatchSnapshot()
})
