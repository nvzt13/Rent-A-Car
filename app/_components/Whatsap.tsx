"use client"
import React from 'react';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { IconButton, Box } from '@mui/material';

const FloatingWhatsAppButton = () => {
  const handleWhatsAppClick = () => {
    // Open WhatsApp with a pre-filled message
    window.open('https://wa.me/1234567890?text=Hello! I am interested in renting a car.', '_blank');
  };

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: { xs: 16, md: 32 }, // Adjust bottom margin for mobile and larger screens
        right: { xs: 16, md: 32 },  // Adjust right margin for mobile and larger screens
        zIndex: 1000, // Make sure it floats above other components
      }}
    >
      <IconButton
        color="success"
        aria-label="whatsapp"
        size="large"
        onClick={handleWhatsAppClick}
        sx={{
          backgroundColor: '#25D366',
          '&:hover': {
            backgroundColor: '#20b358',
          },
          color: 'white',
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)',
          width: { xs: 48, md: 64 }, // Adjust size for mobile (smaller button on mobile)
          height: { xs: 48, md: 64 },
        }}
      >
        <WhatsAppIcon fontSize="large" />
      </IconButton>
    </Box>
  );
};

export default FloatingWhatsAppButton;
