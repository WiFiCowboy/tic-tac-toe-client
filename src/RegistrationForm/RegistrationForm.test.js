import React from 'react';
import RegistrationForm from './RegistrationForm';

import { shallow } from 'enzyme'

it('renders without crashing', () => {
  shallow(<RegistrationForm />)
})