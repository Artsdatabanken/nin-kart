import React from 'react'
import { shallow } from 'enzyme'
import SearchBox from './SearchBox'

test('searchBox', () => {
  const onQueryChange = jest.fn()
  const wrapper = shallow(<SearchBox onQueryChange={onQueryChange} />)
  expect(wrapper).toMatchSnapshot()

  const textField = wrapper.find('TextField')
  wrapper.instance().textField = { blur: () => {} }
  const event = { keyCode: 27, stopPropagation: () => {} }
  textField.simulate('keyDown', event)
  expect(onQueryChange).toBeCalledWith(event, '')

  expect(wrapper).toMatchSnapshot()
})
