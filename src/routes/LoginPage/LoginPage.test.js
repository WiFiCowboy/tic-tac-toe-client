import React from 'react';
import LoginPage from './LoginPage';

import { shallow } from 'enzyme'

it('renders without crashing', () => {
  shallow(<LoginPage />)
})