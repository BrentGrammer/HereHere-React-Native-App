import { shallow, mount, render } from 'enzyme';
import { LoginScreen } from '../../screens/LoginScreen/LoginScreen';
import React from 'react';
import renderer from 'react-test-renderer';


describe('Login Screen tests', () => {

  it('should render login screen without crashing', () => {
    const rendered = renderer.create(<LoginScreen />).toJSON();
    expect(rendered).toBeTruthy();
  });

  it('should render the Text labels for fields', () => {
    const wrapper = shallow(<LoginScreen />);
    expect(wrapper.find('Text')).toHaveLength(1);
  })
})
