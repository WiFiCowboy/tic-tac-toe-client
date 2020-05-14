import React from "react";
import Greeting from "./Greeting";

import { shallow } from "enzyme";

it("renders without crashing", () => {
  shallow(<Greeting />);
});
