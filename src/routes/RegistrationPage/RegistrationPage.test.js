import React from 'react';
import RegistrationPage from './RegistrationPage';

import { shallow } from 'enzyme'

it('renders without crashing', () => {
  shallow(<RegistrationPage />)
})