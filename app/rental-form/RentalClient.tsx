"use client"
import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';

const RentalClient = () => {
  const [formData, setFormData] = useState({
    customerName: '',
    phoneNumber: '',
    rentalDate: '',
    deliveryDate: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here (e.g., send data to API)
    console.log('Rental Form Data:', formData);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        maxWidth: 400,
        margin: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        p: 2,
        boxShadow: 3,
        borderRadius: 2,
        backgroundColor: 'white',
      }}
    >
      <Typography variant="h5" align="center" gutterBottom>
        Rent a Car Form
      </Typography>
      
      <TextField
        label="Customer Name"
        name="customerName"
        value={formData.customerName}
        onChange={handleChange}
        required
      />
      
      <TextField
        label="Phone Number"
        name="phoneNumber"
        type="tel"
        value={formData.phoneNumber}
        onChange={handleChange}
        required
      />
      
      <TextField
        label="Rental Date"
        name="rentalDate"
        type="date"
        InputLabelProps={{
          shrink: true,
        }}
        value={formData.rentalDate}
        onChange={handleChange}
        required
      />
      
      <TextField
        label="Delivery Date"
        name="deliveryDate"
        type="date"
        InputLabelProps={{
          shrink: true,
        }}
        value={formData.deliveryDate}
        onChange={handleChange}
        required
      />
      
      <Button variant="contained" color="primary" type="submit">
        Submit
      </Button>
    </Box>
  );
};

export default RentalClient;
