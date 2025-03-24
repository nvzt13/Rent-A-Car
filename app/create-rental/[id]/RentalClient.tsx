"use client"
import React, { useEffect, useState } from 'react';
import { Button, Box, Typography, TextField, MenuItem, FormControl, Select, InputLabel } from '@mui/material';
import { useSelector } from 'react-redux';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Car } from '@prisma/client';
import { RootState } from '@/lib/store';

interface RentalClientProps {
  id: number;
}

const RentalClient: React.FC<RentalClientProps> = ({ id }) => {
  const cars = useSelector((state: RootState) => state.cars.cars);
  const [blockDays, setBlockDays] = useState<string[]>([]);
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
          setBlockDays(data.blockDays);
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
    const formattedDate = date.toISOString().split('T')[0];
    return blockDays?.includes(formattedDate);
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
        setFormData({
          customerName: '',
          phoneNumber: '',
          takeHour: '',
          deliveryHour: '',
          rentalDate: '',
          returnDate: '',
          carId: id,
        })
      } else {
        alert('Randevu oluşturulamadı');
      }
    } catch (error) {
      console.error(error);
    }
    console.log('Rental Form Data:', formDataToSubmit);
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
          name="carId"
          value={formData.carId}
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
        label="Alış Saati"
        name="takeHour"
        type="time"
        value={formData.takeHour}
        onChange={handleChange}
        required
      />

      <TextField
        label="Teslim Saati"
        name="deliveryHour"
        type="time"
        value={formData.deliveryHour}
        onChange={handleChange}
        required
      />

      <DatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        placeholderText="Rental Date"
        minDate={new Date()}
        filterDate={(date) => !isDateBlocked(date)}
      />

      <DatePicker
        selected={endDate}
        onChange={(date) => setEndDate(date)}
        placeholderText="Return Date"
        minDate={startDate || new Date()}
        filterDate={(date) => !isDateBlocked(date)}
      />

      <Button variant="contained" color="primary" type="submit">
        Submit
      </Button>
    </Box>
  );
};

export default RentalClient;
