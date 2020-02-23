import React, { Component } from "react";
import PropTypes from "prop-types";
import "./ContactItem.css";

class ContactItem extends Component {
  render() {
    const { name, email, pic } = this.props;
    return (
      <div className="UserCard">
        <div className="UserCardTop">
          <img alt="pic" src={pic} />
        </div>
        <div className="UserCardBottom">
          <h3>{name}</h3>
          <p>email: {email}</p>
        </div>
      </div>
    );
  }
}
ContactItem.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  pic: PropTypes.string
};
export default ContactItem;
