import { render, screen } from '@testing-library/react';
import App from './App';

import React from 'react';
 
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Registration from './components/registration/registration';
import { shallow } from 'enzyme';
 
configure({ adapter: new Adapter() });

describe('simple test', () => {
  it('renders three reg', () => {
    const wrapper = shallow(<App/>);
    expect(wrapper.contains("#registeration-form"))
});
});
