import React from 'react';
import { IconButton } from '@mui/material';
import PrintIcon from '@mui/icons-material/Print';

const PrintButton = ({ handlePrint }) => {
  return (
    <IconButton onClick={handlePrint}>
      <PrintIcon />
    </IconButton>
  );
};

export default PrintButton;
