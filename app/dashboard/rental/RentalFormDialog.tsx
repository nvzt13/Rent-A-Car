"use client";
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  Typography,
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Rental, Car } from "@prisma/client";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import { updateRental } from "@/lib/slice/rentalSlice";

interface RentalFormDialogProps {
  open: boolean;
  onClose: () => void;
  selectedRental: Rental | null;
}

const RentalFormDialog = ({ open, onClose, selectedRental }: RentalFormDialogProps) => {
  const dispatch = useAppDispatch();
  const cars = useAppSelector((state: { cars: { cars: Car[] } }) => state.cars.cars);

  const [formData, setFormData] = useState({
    customerName: "",
    phoneNumber: "",
    carId: 0,
    takeHour: "10:00",
  });

  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  useEffect(() => {
    if (selectedRental) {
      setFormData({
        customerName: selectedRental.customerName,
        phoneNumber: selectedRental.phoneNumber || "",
        carId: selectedRental.carId,
        takeHour: selectedRental.takeHour || "10:00",
      });
      setStartDate(new Date(selectedRental.rentalDate));
      setEndDate(new Date(selectedRental.returnDate));
    }
  }, [selectedRental]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }> | SelectChangeEvent<string>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name as string]: value,
    }));
  };

  const isDateBlocked = (date: Date) => {
    console.log(date);
    return false; // Replace with actual logic to determine if the date is blocked
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRental || !startDate || !endDate) return;

    dispatch(updateRental(6));

    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Randevu Düzenle</DialogTitle>
      <DialogContent>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            maxWidth: 800,
            margin: "auto",
            display: "flex",
            flexDirection: "column",
            gap: 2,
            p: 2,
            boxShadow: 3,
            borderRadius: 2,
            backgroundColor: "white",
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
            label="Telefon"
            name="phoneNumber"
            type="tel"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
          />

          <FormControl required>
            <InputLabel id="car-select-label">Araba</InputLabel>
            <Select
              labelId="car-select-label"
              name="carId"
              value={formData.carId}
              onChange={handleChange}
            >
              {cars.map((car: Car) => (
                <MenuItem key={car.id} value={car.id}>
                  {car.name} {car.carModel}
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

          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            placeholderText="Alış Tarihi"
            minDate={new Date()}
            filterDate={(date) => !isDateBlocked(date)}
            className="form-control"
          />

          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            placeholderText="Teslim Tarihi"
            minDate={startDate || new Date()}
            filterDate={(date) => !isDateBlocked(date)}
            className="form-control"
          />

          <Button variant="contained" color="primary" type="submit">
            Kaydet
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default RentalFormDialog;