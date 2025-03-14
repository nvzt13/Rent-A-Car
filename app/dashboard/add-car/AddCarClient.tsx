'use client'
import React, { useState } from 'react';
import { TextField, Button, MenuItem, Typography, Box, Card, CardMedia } from '@mui/material';
import { Car } from '@prisma/client';
import {CreateCar} from '@/type/types';

const AddCar = () => {
  const [carData, setCarData] = useState<CreateCar>({
    name: '',
    carModel: '',
    fuelType: '',
    km: null,
    price: null,
    carType: '',
    image: ""
  });
  const [updateCarData, setUpdateCarData] = useState(false)
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const fuelTypes = ['Gasoline', 'Diesel', 'Electric', 'Hybrid'];
  const statuses = ['Offline', 'Online'];
  const carModel = ['Premium', 'Ekonomi', 'Suv'];

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setCarData({
      ...carData,
      [name]: value,
    });
  };


  const handleImageChange = (e:any) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCarData({
      ...carData,
      image: reader.result as string,
    });
    setImagePreview(URL.createObjectURL(file));// Set image as base64 string
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleSubmit = async (e:any) => {
  e.preventDefault();
  const formData = new FormData();
  for (const key in carData) {
    formData.append(key, carData[key]);
  }

  try {
    const response = await fetch('/api/v1/car', {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      alert('Car added successfully');
      console.log(response.text)
    } else {
      alert('Failed to add car');
      console.log(response)
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Error adding car');
    console.log(error)

  }
};

  return (
    <Box 
      component="form" 
      onSubmit={handleSubmit} 
      sx={{ 
        maxWidth: 400, 
        mx: 'auto', 
        mt: 4, 
        p: 3, 
        bgcolor: '#f7f7f7', 
        borderRadius: 2, 
        boxShadow: 3 
      }}
    >
      <Typography variant="h5" gutterBottom align="center" color="primary">
        Add New Car
      </Typography>
      <TextField
        label="Car Name"
        name="name"
        value={carData.name}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
        required
      />
      <TextField
        label="Model"
        name="carModel"
        value={carData.carModel}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
        required
      />
      <TextField
        label="Fuel Type"
        name="fuelType"
        value={carData.fuelType}
        onChange={handleInputChange}
        select
        fullWidth
        margin="normal"
        required
      >
        {fuelTypes.map((type) => (
          <MenuItem key={type} value={type}>
            {type}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        label="Car Type"
        name="carType"
        value={carData.carType}
        onChange={handleInputChange}
        select
        fullWidth
        margin="normal"
        required
      >
        {carModel.map((type) => (
          <MenuItem key={type} value={type}>
            {type}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        label="Kilometers"
        name="km"
        value={carData.km}
        onChange={handleInputChange}
        type="number"
        fullWidth
        margin="normal"
        required
      />
      <TextField
        label="Price"
        name="price"
        value={carData.price}
        onChange={handleInputChange}
        type="number"
        fullWidth
        margin="normal"
        required
      />
           {
       updateCarData ?  <>
         <TextField
        label="Status"
        name="status"
        value={carData.status}
        onChange={handleInputChange}
        select
        fullWidth
        margin="normal"
        required
      >
        {statuses.map((status) => (
          <MenuItem key={status} value={status}>
            {status}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        label="Alış Tarihi"
        name="startDate"
        value={carData.startDate}
        onChange={handleInputChange}
        type="date"
        fullWidth
        margin="normal"
        required
      />
      <TextField
        label="Teslim Tarihi"
        name="endDate"
        value={carData.endDate}
        onChange={handleInputChange}
        type="date"
        fullWidth
        margin="normal"
        required
      />
       </> : null
     }
      <Button 
        variant="contained" 
        component="label" 
        fullWidth 
        sx={{ my: 2 }}
        color="secondary"
      >
        Upload Car Image
        <input type="file" hidden onChange={handleImageChange} />
      </Button>

      {imagePreview && (
        <Card sx={{ my: 2 }}>
          <CardMedia
            component="img"
            image={imagePreview}
            alt="Car Image Preview"
            sx={{ height: 150 }}
          />
        </Card>
      )}

      <Button 
        type="submit" 
        variant="contained" 
        color="primary" 
        fullWidth
        sx={{ py: 1.5 }}
      >
        Add Car
      </Button>
    </Box>
  );
};

export default AddCar;