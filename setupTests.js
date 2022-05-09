// import expect from 'expect'
import React from 'react'
import { shallow, render, mount } from 'enzyme'
// import Enzyme, { shallow, render, mount } from 'enzyme'
// import Adapter from 'enzyme-adapter-react-16'
// import { createSerializer } from 'enzyme-to-json'
import sinon from 'sinon'

// Set the default serializer for Jest to be the from enzyme-to-json
// This produces an easier to read (for humans) serialized format.
// expect.addSnapshotSerializer(createSerializer({ mode: 'deep' }))

// React 16 Enzyme adapter
// Enzyme.configure({ adapter: new Adapter() })

// Make Enzyme functions available in all test files without importing
global.React = React
global.shallow = shallow
global.render = render
global.mount = mount
global.sinon = sinon
global.window = {}
global.window.parent = {}
global.window.parent.performance = {}
global.window.parent.performance.timing = {}
global.window.parent.performance.timing.domComplete = 21321321321
global.window.parent.performance.navigation = {}
global.window.parent.performance.navigation.type = {}

// Fail tests on any warning
console.error = message => {
  throw new Error(message)
}
