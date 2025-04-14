"use client";

import React, { useState, useMemo } from "react";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import { deleteRental } from "@/lib/slice/rentalSlice";
import { RentalState } from "@/type/types";
import { alpha } from "@mui/material/styles";
import { Rental, Car } from "@prisma/client";
import {
  Box,
  Stack,
  Paper,
  Table,
  Select,
  Button,
  Dialog,
  Tooltip,
  MenuItem,
  Typography,
  TableRow,
  TableCell,
  TableHead,
  TableBody,
  TableContainer,
  IconButton,
  FormControl,
  InputLabel,
} from "@mui/material";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { FaSpinner } from "react-icons/fa";

import Calender from "../_components/Calender";
import RentalDialog from "../_components/RentalDialog";

const RentalClient = () => {
  const [selectedCarId, setSelectedCarId] = useState<string>("all");
  const [selectedRental, setSelectedRental] = useState<Rental | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedRental, setEditedRental] = useState<Rental | null>(null);

  const dispatch = useAppDispatch();
  const rawRentals = useAppSelector((state: { rentals: RentalState }) => state.rentals.rentals);
  const loading = useAppSelector((state: { rentals: RentalState }) => state.rentals.loadingRental);
  const cars = useAppSelector((state: { cars: { cars: Car[]; loading: boolean } }) => state.cars.cars);

  const rentals: Rental[] = Array.isArray(rawRentals) ? rawRentals : rawRentals ? [rawRentals] : [];

  const today = new Date();

  const filteredRentals = useMemo(() => {
    return selectedCarId === "all"
      ? rentals
      : rentals.filter((rental) => rental.carId === selectedCarId);
  }, [selectedCarId, rentals]);

  const upcomingRentals = useMemo(() => {
    return filteredRentals.filter((rental) => new Date(rental.rentalDate) >= today);
  }, [filteredRentals]);

  const busyDates = useMemo(() => {
    const createDateRange = (start: Date, end: Date) => {
      const dates: string[] = [];
      const current = new Date(start);
      while (current <= end) {
        dates.push(current.toISOString().split("T")[0]);
        current.setDate(current.getDate() + 1);
      }
      return dates;
    };

    if (selectedRental) {
      return createDateRange(
        new Date(selectedRental.rentalDate),
        new Date(selectedRental.returnDate)
      );
    }

    return filteredRentals.flatMap((rental) =>
      createDateRange(new Date(rental.rentalDate), new Date(rental.returnDate))
    );
  }, [selectedRental, filteredRentals]);

  const rentalDays = selectedRental
    ? Math.ceil(
        (new Date(selectedRental.returnDate).getTime() -
          new Date(selectedRental.rentalDate).getTime()) /
          (1000 * 60 * 60 * 24)
      ) + 1
    : 0;

  const selectedCar = cars.find((car) => car.id === selectedRental?.carId);
  const dailyPrice = selectedCar?.price || 0;
  const totalPrice = rentalDays * dailyPrice;

  const handleEditClick = () => {
    setIsEditing(true);
    setEditedRental(selectedRental);
  };

  const handleSave = () => {
    if (editedRental) {
      console.log("Düzenleme kaydedildi:", editedRental);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedRental(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center w-full h-screen">
        <FaSpinner className="animate-spin text-4xl" />
      </div>
    );
  }

  return (
    <Box sx={{ width: "100%", padding: 2, backgroundColor: (theme) =>
              alpha(theme.palette.background.default, 1) }}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          textAlign: "center",
          fontWeight: "bold",
          fontSize: "2rem",
          color: "primary.main",
          textTransform: "uppercase",
          borderBottom: "2px solid",
          paddingBottom: 1,
          marginTop: 5,
        }}
      >
        Randevu
      </Typography>

      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
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

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 2,
        }}
      >
        <TableContainer component={Paper} sx={{ boxShadow: 3, borderRadius: 2, flex: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><Typography fontWeight="bold">Müşteri Adı</Typography></TableCell>
                <TableCell><Typography fontWeight="bold">Telefon</Typography></TableCell>
                <TableCell><Typography fontWeight="bold">Kalan Gün</Typography></TableCell>
                <TableCell align="center"><Typography fontWeight="bold">İşlemler</Typography></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {upcomingRentals.map((rental) => {
                const rentalDate = new Date(rental.rentalDate);
                const daysLeft = Math.ceil((rentalDate.getTime() - today.getTime()) / (1000 * 3600 * 24));

                let rowColor = "#e0e0e0";
                if (daysLeft < 5) rowColor = "#ffebee";
                else if (daysLeft < 10) rowColor = "#e3f2fd";

                const isSelected = selectedRental?.id === rental.id;

                return (
                  <TableRow
                    key={rental.id}
                    sx={{
                      cursor: "pointer",
                      backgroundColor: isSelected ? "#4b77de" : rowColor,
                      "& td": {
                        color: isSelected ? "#fff" : "inherit",
                      },
                      "&:hover": {
                        backgroundColor: isSelected ? "#3b66c5" : "#f5f5f5",
                      },
                    }}
                    onClick={() => setSelectedRental(rental)}
                  >
                    <TableCell>{rental.customerName}</TableCell>
                    <TableCell>{rental.phoneNumber}</TableCell>
                    <TableCell>{`${daysLeft} gün`}</TableCell>
                    <TableCell align="center">
                      <Stack direction="row" spacing={1} justifyContent="center">
                        <Tooltip title="Düzenle">
                          <span>
                            <IconButton
                              sx={{ color: isSelected ? "#fff" : "primary.main" }}
                              onClick={handleEditClick}
                            >
                              <AiOutlineEdit />
                            </IconButton>
                          </span>
                        </Tooltip>
                        <Tooltip title="Sil">
                          <IconButton
                            sx={{ color: isSelected ? "#fff" : "error.main" }}
                            onClick={() => dispatch(deleteRental(rental.id))}
                          >
                            <AiOutlineDelete />
                          </IconButton>
                        </Tooltip>
                      </Stack>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>

        <Box
          mt={{ xs: 2, md: 0 }}
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Calender busyDates={busyDates} />

          {selectedRental && (
            <Box
              p={2}
              sx={{
                border: "1px solid #ccc",
                borderRadius: 2,
                backgroundColor: "#f9f9f9",
                width: "100%",
              }}
            >
              <Typography variant="h6" gutterBottom>Randevu Detayı</Typography>
              <Typography>Kiralama Tarihi: {new Date(selectedRental.rentalDate).toLocaleDateString()}</Typography>
              <Typography>Teslim Tarihi: {new Date(selectedRental.returnDate).toLocaleDateString()}</Typography>
              <Typography>Toplam Gün: {rentalDays}</Typography>
              <Typography>Günlük Ücret: {dailyPrice} ₺</Typography>
              <Typography fontWeight="bold">Toplam Ücret: {totalPrice} ₺</Typography>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default RentalClient;