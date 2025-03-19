"use client"
import React, { useState } from 'react';
import { Button, Box, Typography } from '@mui/material';
import { useSelector } from 'react-redux'
import { TextField, MenuItem, Select, InputLabel,
FormControl } from '@mui/material';


const RentalClient = () => {
  const cars = useSelector((state) => state.cars.cars);
  
  const [formData, setFormData] = useState({
    customerName: '',
    phoneNumber: '',
    takeHour:'',
    deliveryHour:'',
    rentalDate: '',
    returnDate: '',
    carId:''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      const response = await fetch('/api/v1/rental', {
        method:'POST',
        body: JSON.stringify(formData)
      });
      if(response.ok){
        alert('Randevu olustu')
      } else {
        
        alert('Randevu olusmadi')
      }
    } catch(error){
      console.log(error)
    }
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
        label="Ad Soyad"
        name="customerName"
        value={formData.customerName}
        onChange={handleChange}
        required
      />
      <FormControl required>
        <InputLabel id="car-select-label">Car</InputLabel>
        <Select
          labelId="car-select-label"
          name="car"
          value={formData.car}
          onChange={handleChange}
        >
          {cars.map((car) => (
            <MenuItem key={car.id} value={car.id}>
              {car.name} 
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        label="Phone Number"
        name="phoneNumber"
        type="tel"
        value={formData.phoneNumber}
        onChange={handleChange}
        required
      />
            <TextField
        label="Alis saati"
        name="takeHour"
        type="time"
        InputLabelProps={{
          shrink: true,
        }}
        value={formData.takeHour}
        onChange={handleChange}
        required
      />
            <TextField
        label="Teslim Saati"
        name="deliveryHour"
        type="time"
        InputLabelProps={{
          shrink: true,
        }}
        value={formData.deliveryHour}
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
/*
import React, { useState } from 'react';
import { useSelector } from 'react-redux'; // To access the Redux store
import { TextField, Button, Box, Typography, MenuItem, Select, InputLabel, FormControl } from '@mui/material';

const RentalClient = ({ id }) => {
  const cars = useSelector((state) => state.cars); // Assuming 'cars' is in your Redux store
  console.log(id);
  
  const [formData, setFormData] = useState({
    customerName: '',
    phoneNumber: '',
    rentalDate: '',
    deliveryDate: '',
    car: '', // Add 'car' to the form data
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

      
      <FormControl required>
        <InputLabel id="car-select-label">Car</InputLabel>
        <Select
          labelId="car-select-label"
          name="car"
          value={formData.car}
          onChange={handleChange}
        >
          {cars.map((car) => (
            <MenuItem key={car.id} value={car.id}>
              {car.name} 
            </MenuItem>
          ))}
        </Select>
      </FormControl>

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
*/