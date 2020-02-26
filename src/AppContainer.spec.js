import React from "react";
import Adapter from "enzyme-adapter-react-16";
import Enzyme, { shallow } from "enzyme";
import AppContainer from "./AppContainer";

Enzyme.configure({ adapter: new Adapter() });

describe("enzyme context snapshot", () => {
  it("should render children for snapshot", () => {
    const tree = shallow(<AppContainer />);
    expect(tree).toMatchSnapshot();
  });
});
