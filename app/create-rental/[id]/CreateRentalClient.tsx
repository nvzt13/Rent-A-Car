"use client";
import React, { useEffect, useState } from "react";
import {
  Button,
  Box,
  Typography,
  TextField,
  MenuItem,
  FormControl,
  Select,
  InputLabel,
  collapseClasses,
} from "@mui/material";
import { useSelector } from "react-redux";
import "react-datepicker/dist/react-datepicker.css";
import { Car } from "@prisma/client";
import { RootState } from "@/lib/redux/store";
import { SelectChangeEvent } from "@mui/material";
interface RentalClientProps {
  id: number;
}
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { registerLocale } from "react-datepicker";
import tr from "date-fns/locale/tr";

registerLocale("tr", tr);
const RentalClient: React.FC<RentalClientProps> = ({ id }) => {
  const cars = useSelector((state: RootState) => state.cars.cars);
  const [blockDays, setBlockDays] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    customerName: "",
    phoneNumber: "",
    takeHour: "",
    rentalDate: "",
    returnDate: "",
    carId: id,
  });
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  // Fetch blocked days from the backend
  useEffect(() => {
    const fetchBlockDate = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          `/api/v2/cars/${formData.carId}/booked-days`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          setBlockDays(data.blockDays);
        } else {
          console.log("İşlem başarısız!");
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchBlockDate();
  }, [formData.carId]);

  // Function to check if a date is blocked
  const isDateBlocked = (date: Date): boolean => {
    const formattedDate = date.toISOString().split("T")[0];
    return blockDays?.includes(formattedDate);
  };

  const handleSelectChange = (event: SelectChangeEvent<number>) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: Number(value), // çünkü id sayısal
    });
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
      alert("Lütfen tarihleri seçiniz.");
      return;
    }

    const rentalDate = startDate.toISOString().split("T")[0];
    const returnDate = endDate.toISOString().split("T")[0];

    if (isDateBlocked(startDate) || isDateBlocked(endDate)) {
      alert("Seçtiğiniz tarihler dolu. Lütfen başka tarihler seçin.");
      return;
    }

    const formDataToSubmit = {
      ...formData,
      rentalDate,
      returnDate,
    };

    try {
      const token = localStorage.getItem("token");
      const response = await fetch("/api/v2/rental", {
        method: "POST",
        body: JSON.stringify(formDataToSubmit),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        alert("Randevu oluşturuldu");
        setFormData({
          customerName: "",
          phoneNumber: "",
          takeHour: "",
          rentalDate: "",
          returnDate: "",
          carId: id,
        });
      } else {
        alert("Randevu oluşturulamadı");
      }
    } catch (error) {
      console.error(error);
    }
    console.log("Rental Form Data:", formDataToSubmit);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        maxWidth: 700, // örnek olarak 1000 yaptık
        width: "100%", // ekran boyutuna uyumlu hale getirir
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
      <Typography
        variant="h5"
        align="center"
        gutterBottom
        sx={{ fontWeight: "bold", mb: 2, color: "primary.main" }}
      >
        Araç Kiralama Formu
      </Typography>

      <TextField
        label="Ad Soyad"
        name="customerName"
        value={formData.customerName}
        onChange={handleChange}
        required
      />

      <TextField
        label="Telefon Numarası"
        name="phoneNumber"
        type="tel"
        value={formData.phoneNumber}
        onChange={handleChange}
        required
      />

      <FormControl required>
        <Select
          labelId="car-select-label"
          name="carId"
          value={formData.carId}
          onChange={handleSelectChange}
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
      <DatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        placeholderText="Kiralama Tarihi"
        minDate={new Date()}
        filterDate={(date) => !isDateBlocked(date)}
        locale="tr"
        className="text-gray-900 rounded p-2"
      />

      <DatePicker
        selected={endDate}
        onChange={(date) => setEndDate(date)}
        placeholderText="İade Tarihi"
        minDate={startDate || new Date()}
        filterDate={(date) => !isDateBlocked(date)}
        locale="tr"
        className="text-gray-900 rounded p-2"
      />

      <Button variant="contained" color="primary" type="submit">
        Gönder
      </Button>
    </Box>
  );
};

export default RentalClient;
