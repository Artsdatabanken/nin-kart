import React from 'react'
import { shallow } from 'enzyme'
import Mapbox from '.'

test('searchBox', () => {
  const wrapper = shallow(<Mapbox />)
  expect(wrapper).toMatchSnapshot()
  wrapper.setProps({ opplystKode: 'NA' })
  expect(wrapper).toMatchSnapshot()
  wrapper.setProps({ aktivKode: 'NA' })
  expect(wrapper).toMatchSnapshot()
  wrapper.setProps({ oppdaterteFarger: 'NA' })
  expect(wrapper).toMatchSnapshot()
})
