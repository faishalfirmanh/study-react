// CustomButton.js
import React from 'react';
import Button from '@mui/material/Button';

const ButtonCustom = ({ variant, color, size, onClick, children }) => {
  return (
    <Button
      variant={variant}
      color={color}
      size={size}
      onClick={onClick}
    >
      {children}
    </Button>
  );
};

export default ButtonCustom;
