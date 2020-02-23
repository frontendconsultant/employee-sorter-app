import React from "react";
import PropTypes from "prop-types";
import "./ContactItem.css";

function ContactItem(props) {
    const { name, email, pic } = props;
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
ContactItem.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  pic: PropTypes.string
};
export default ContactItem;
