import React from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';

const AddRental = () => {
  return (
    <Box
      component="form"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        bgcolor: "#f7f7f7",
        gap: 2,
        maxWidth: 400,
        margin: 'auto',
        mt: 4,
        p: 3,
        boxShadow: 3,
        borderRadius: 2,
      }}
    >
      <Typography variant="h5" align="center" gutterBottom>
        Add Rental Information
      </Typography>
      
      {/* Customer Name */}
      <TextField 
        label="Customer Name" 
        variant="outlined" 
        fullWidth 
        required 
      />

      {/* Rental Date */}
      <TextField 
        label="Rental Date" 
        type="date" 
        fullWidth 
        InputLabelProps={{ shrink: true }}
        required 
      />

      {/* Return Date */}
      <TextField 
        label="Return Date" 
        type="date" 
        fullWidth 
        InputLabelProps={{ shrink: true }}
        required 
      />

      {/* Car Model */}
      <TextField 
        label="Car Model" 
        variant="outlined" 
        fullWidth 
        required 
      />

      {/* Submit Button */}
      <Button 
        variant="contained" 
        color="primary" 
        type="submit"
        fullWidth
      >
        Add Rental
      </Button>
    </Box>
  );
}

export default AddRental;