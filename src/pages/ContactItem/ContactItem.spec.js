import React from "react";
import Adapter from "enzyme-adapter-react-16";
import Enzyme, { mount, shallow } from "enzyme";
import ContactItem from "./ContactItem";

Enzyme.configure({ adapter: new Adapter() });

describe("enzyme context snapshot", () => {
  it("should render children for snapshot", () => {
    const tree = shallow(<ContactItem />);
    expect(tree).toMatchSnapshot();
  });
  it('allows to set props', () => {
    const wrapper = mount(<ContactItem name="vijay" />);
    expect(wrapper.props().name).toEqual('vijay');
  });
  it('renders contact-items', () => {
    const wrapper = shallow(<ContactItem name="vijay" email="vijaysinghfed@klm.com"/>);
    expect(wrapper.contains(<h3>vijay</h3>)).toBeTruthy();
  });

});
