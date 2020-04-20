import React from 'react';
import LoginForm from './LoginForm';

import { shallow } from 'enzyme'

it('renders without crashing', () => {
  shallow(<LoginForm />)
})