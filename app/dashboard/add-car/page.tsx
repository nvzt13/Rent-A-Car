'use client'
import React, { useState } from 'react';
import { TextField, Button, MenuItem, Typography, Box, Card, CardMedia } from '@mui/material';

const AddCar = () => {
  const [carData, setCarData] = useState({
    name: '',
    model: '',
    fuelType: '',
    km: '',
    price: '',
    status: '',
    date: '',
    image: null,
  });
  const [imagePreview, setImagePreview] = useState(null);

  const fuelTypes = ['Gasoline', 'Diesel', 'Electric', 'Hybrid'];
  const statuses = ['Available', 'Rented', 'In Maintenance'];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCarData({
      ...carData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setCarData({
      ...carData,
      image: file,
    });
    setImagePreview(URL.createObjectURL(file)); // Resim önizlemesi için
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', carData.name);
    formData.append('model', carData.model);
    formData.append('fuelType', carData.fuelType);
    formData.append('km', carData.km);
    formData.append('price', carData.price);
    formData.append('status', carData.status);
    formData.append('date', carData.date);
    formData.append('image', carData.image);

    try {
      const response = await fetch('/api/cars', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        alert('Car added successfully');
      } else {
        alert('Failed to add car');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error adding car');
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
        name="model"
        value={carData.model}
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
        label="Date Added"
        name="date"
        value={carData.date}
        onChange={handleInputChange}
        type="date"
        fullWidth
        margin="normal"
        InputLabelProps={{
          shrink: true,
        }}
        required
      />
      <Button 
        variant="contained" 
        component="label" 
        fullWidth 
        sx={{ my: 2 }}
        color="secondary"
      >
        Upload Car Image
        <input type="file" hidden onChange={handleFileChange} />
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
