"use client";

import React, { useState, useMemo } from "react";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { FaSpinner } from "react-icons/fa";
import { Rental, Car } from "@prisma/client";
import {
  IconButton,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  Stack,
  Tooltip,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { deleteRental } from "@/lib/slice/rentalSlice";
import { RentalState } from "@/type/types";
import Calender from "../_components/Calender";

const RentalClient = () => {
  const [selectedCarId, setSelectedCarId] = useState<string>("all");
  const [selectedRental, setSelectedRental] = useState<Rental | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const rawRentals = useAppSelector(
    (state: { rentals: RentalState }) => state.rentals.rentals
  );
  const loading = useAppSelector(
    (state: { rentals: RentalState }) => state.rentals.loadingRental
  );
  const rentals: Rental[] = Array.isArray(rawRentals)
    ? rawRentals
    : rawRentals
    ? [rawRentals]
    : [];

  const cars = useAppSelector(
    (state: { cars: { cars: Car[]; loading: boolean } }) => state.cars.cars
  );
  const dispatch = useAppDispatch();

  const filteredRentals = rentals.filter((rental: Rental) => {
    const carFilter =
      selectedCarId === "all"
        ? true
        : rental.carId?.toString() === selectedCarId.toString();
    return carFilter;
  });

  const handleEditClick = () => {
    console.log("Düzenle");
    setIsEditing(true);
  };

  const busyDates = useMemo(() => {
    if (selectedRental) {
      const start = new Date(selectedRental.rentalDate);
      const end = new Date(selectedRental.returnDate);
      const dates: string[] = [];
      const current = new Date(start);

      while (current <= end) {
        dates.push(current.toISOString().split("T")[0]);
        current.setDate(current.getDate() + 1);
      }

      return dates;
    }

    return filteredRentals.flatMap((rental) => {
      const start = new Date(rental.rentalDate);
      const end = new Date(rental.returnDate);
      const dates: string[] = [];
      const current = new Date(start);

      while (current <= end) {
        dates.push(current.toISOString().split("T")[0]);
        current.setDate(current.getDate() + 1);
      }

      return dates;
    });
  }, [selectedRental, filteredRentals]);

  if (loading) {
    return (
      <div className="flex items-center justify-center w-full h-screen">
        <FaSpinner className="animate-spin text-4xl" />
      </div>
    );
  }

  return (
    <Box sx={{ width: "100%", padding: 2 }}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Box>
        <Typography
            variant="h4"
            gutterBottom
            sx={{
              textAlign: "center", // Ortalamak için
              fontWeight: "bold", // Daha belirgin yapmak için
              fontSize: "2rem", // Yazı boyutunu artırarak daha büyük hale getirebiliriz
              color: "primary.main", // Temaya bağlı renk ekleyebiliriz
              textTransform: "uppercase", // Başlığı büyük harflerle yazabiliriz
              borderBottom: "2px solid", // Başlık altına ince bir çizgi eklemek için
              paddingBottom: 1, // Başlık altına biraz boşluk eklemek için
              marginTop: 5, // Başlık üstüne biraz boşluk eklemek için  
            }}
          >
            Randevu
          </Typography>
        </Box>

        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          width="100%"
        >
          <FormControl size="small" sx={{ minWidth: 200, marginRight: 2 }}>
            <InputLabel id="car-filter-label">Araba</InputLabel>
            <Select
              labelId="car-filter-label"
              value={selectedCarId}
              label="Araba"
              onChange={(e) => setSelectedCarId(e.target.value)}
            >
              <MenuItem value="all">Tüm Arabalar</MenuItem>
              {cars?.map((car) => (
                <MenuItem key={car.id} value={car.id.toString()}>
                  {car.name} {car.carModel}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Box>

      <TableContainer component={Paper} sx={{ boxShadow: 3, borderRadius: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography fontWeight="bold">Müşteri Adı</Typography>
              </TableCell>
              <TableCell>
                <Typography fontWeight="bold">Telefon</Typography>
              </TableCell>
              <TableCell align="center">
                <Typography fontWeight="bold">İşlemler</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRentals.map((rental) => (
              <TableRow
                key={rental.id}
                sx={{
                  cursor: "pointer",
                  "&:hover": { backgroundColor: "#f5f5f5" },
                }}
                onClick={() => setSelectedRental(rental)}
              >
                <TableCell>{rental.customerName}</TableCell>
                <TableCell>{rental.phoneNumber}</TableCell>
                <TableCell align="center">
                  <Stack direction="row" spacing={1} justifyContent="center">
                    <Tooltip title="Düzenle">
                      <span>
                        <IconButton
                          color="primary"
                          onClick={handleEditClick}
                        >
                          <AiOutlineEdit />
                        </IconButton>
                      </span>
                    </Tooltip>
                    <Tooltip title="Sil">
                      <IconButton
                        color="error"
                        onClick={() => dispatch(deleteRental(rental.id))}
                      >
                        <AiOutlineDelete />
                      </IconButton>
                    </Tooltip>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Takvim */}
      <Box mt={4}>
        <Calender busyDates={busyDates} />
      </Box>
    </Box>
  );
};

export default RentalClient;
