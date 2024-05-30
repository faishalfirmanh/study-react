// CustomButton.js
import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
const ButtonCustom = ({ typeButton,label, onClick, variant, size }) => {
  return (
    <button
      style={{marginBottom:10,marginLeft:10}}
      type={typeButton}
      className={`btn btn-${variant} btn-${size}`}
      onClick={onClick}
      
    >
      {label}
    </button>
  );
};

ButtonCustom.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  onClick: PropTypes.func,
  variant: PropTypes.string,
  size: PropTypes.string,
};

ButtonCustom.defaultProps = {
  onClick: () => {},
  variant: 'primary',
  size: 'md',
  typeButton: 'button'
};

export default ButtonCustom;
