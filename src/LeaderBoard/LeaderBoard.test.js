import React from 'react';
import LeaderBoard from './LeaderBoard';

import { shallow } from 'enzyme'

it('renders without crashing', () => {
  shallow(<LeaderBoard />)
})