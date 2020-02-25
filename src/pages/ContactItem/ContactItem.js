import React from "react";
import PropTypes from "prop-types";
import "./ContactItem.css";

const ContactItem = ({ name, email, pic }) => (
  <div class="card">
  <div class="header">
    <h2>{name}</h2>
  </div>
  <div class="row">
    <div class="avatar-container">
      <div class="photo">
        <img alt="avatarImg" class="img" src="https://picsum.photos/200" />
      </div>
    </div>
    <div class="details-container">
      <div class="content">
        <h3>{name}</h3>
        <p>email: {email}</p>
      </div>
    </div>
  </div>
</div>
);

ContactItem.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  pic: PropTypes.string
};

export default ContactItem;
