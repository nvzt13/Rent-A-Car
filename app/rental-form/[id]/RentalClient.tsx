"use client"
import React, { useEffect, useState } from 'react';
import { Button, Box, Typography, TextField, MenuItem, FormControl, Select } from '@mui/material';
import { useSelector } from 'react-redux';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Car } from '@prisma/client';
import { RootState } from '@/lib/store';

interface RentalClientProps {
  id: number; // Define the id as a number type
}

const RentalClient: React.FC<RentalClientProps> = ({ id }) => {
  const cars = useSelector((state: RootState) => state.cars.cars);
  const [blockDays, setBlockDays] = useState<string[]>([]); // blockDays: List of blocked dates
  const [formData, setFormData] = useState({
    customerName: '',
    phoneNumber: '',
    takeHour: '',
    deliveryHour: '',
    rentalDate: '',
    returnDate: '',
    carId: id,
  });

  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  // Fetch blocked days from the backend
  useEffect(() => {
    const fetchBlockDate = async () => {
      try {
        const response = await fetch(`/api/v1/car/${formData.carId}/block-date`);
        if (response.ok) {
          const data = await response.json();
          setBlockDays(data.blockDays); // Blocked dates
        } else {
          console.log('İşlem başarısız!');
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchBlockDate();
  }, [formData.carId]);

  // Function to check if a date is blocked
  const isDateBlocked = (date: Date): boolean => {
    const formattedDate = date.toISOString().split('T')[0]; // Format date as YYYY-MM-DD
    return blockDays?.includes(formattedDate); // Check if the date is in blocked days
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!startDate || !endDate) {
      alert('Lütfen tarihleri seçiniz.');
      return;
    }

    const rentalDate = startDate.toISOString().split('T')[0];
    const returnDate = endDate.toISOString().split('T')[0];

    if (isDateBlocked(startDate) || isDateBlocked(endDate)) {
      alert('Seçtiğiniz tarihler dolu. Lütfen başka tarihler seçin.');
      return;
    }

    const formDataToSubmit = {
      ...formData,
      rentalDate,
      returnDate,
    };

    try {
      const response = await fetch('/api/v1/rental', {
        method: 'POST',
        body: JSON.stringify(formDataToSubmit),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        alert('Randevu oluşturuldu');
      } else {
        alert('Randevu oluşturulamadı');
      }
    } catch (error) {
      console.error(error);
    }
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
        value={formData.customerName || ''}
        onChange={handleChange}
        required
      />

      <FormControl required>
        <Select
          labelId="car-select-label"
          name="carId"
          value={formData.carId || ''}
          onChange={handleChange}
        >
          {cars.map((car: Car) => (
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
        value={formData.phoneNumber || ''}
        onChange={handleChange}
        required
      />

      <TextField
        name="takeHour"
        type="time"
        value={formData.takeHour || ''}
        onChange={handleChange}
        required
      />

      <TextField
        name="deliveryHour"
        type="time"
        value={formData.deliveryHour || ''}
        onChange={handleChange}
        required
      />

      <DatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        placeholderText="Rental Date"
        minDate={new Date()} // Prevent past date selection
        filterDate={(date) => !isDateBlocked(date)} // Disable blocked dates
      />

      {/* Return Date Picker */}
      <DatePicker
        selected={endDate}
        onChange={(date) => setEndDate(date)}
        placeholderText="Return Date"
        minDate={startDate || new Date()} // Set minimum date to rental date
        filterDate={(date) => !isDateBlocked(date)} // Disable blocked dates
      />

      <Button variant="contained" color="primary" type="submit">
        Submit
      </Button>
    </Box>
  );
};

export default RentalClient;
