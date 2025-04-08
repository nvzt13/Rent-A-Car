"use client"
import React, { useState } from "react";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import {
  AiOutlineDelete,
  AiOutlineEdit,
} from "react-icons/ai";

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
import DateInput from "@/app/_components/DateInput";
import { deleteRental } from "@/lib/slice/rentalSlice";

const RentalClient = () => {
  const [loadingAprove, setLoadingAprove] = useState<{
    [key: number]: boolean;
  }>({});
  const [selectedCarId, setSelectedCarId] = useState<string>("all");
  const [selectedRental, setSelectedRental] = useState<Rental | null>(null);
  const [isEditing, setIsEditing] = useState(false);  // Düzenleme durumu

  const rawRentals = useAppSelector(
    (state: { rentals: { rentals: Rental[] | Rental } }) =>
      state.rentals.rentals
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

  return (
    <Box sx={{ width: "100%", padding: 2 }}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="h4" gutterBottom>
          Randevular
        </Typography>

        <FormControl size="small" sx={{ minWidth: 200 }}>
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

      <Box sx={{display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(300px, 1fr))", gap:2, mt:12}}>
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
                onClick={() => setSelectedRental(rental)} // Randevu seçildiğinde
              >
                <TableCell>{rental.customerName}</TableCell>
                <TableCell>{rental.phoneNumber}</TableCell>
                <TableCell align="center">
                  <Stack direction="row" spacing={1} justifyContent="center">
                    <Tooltip title="Düzenle">
                      <span>
                        <IconButton
                          color="primary"
                          onClick={handleEditClick} // Düzenleme tıklama
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


      <DateInput rental={selectedRental} />
      </Box>
     
    </Box>
  );
};

export default RentalClient;
