import React from 'react';
import LoggedInPage from './LoggedInPage';

import { shallow } from 'enzyme'

it('renders without crashing', () => {
  shallow(<LoggedInPage />)
})