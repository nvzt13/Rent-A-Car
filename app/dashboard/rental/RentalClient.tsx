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
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
} from "@mui/material";
import { deleteRental } from "@/lib/slice/rentalSlice";
import { RentalState } from "@/type/types";
import Calender from "../_components/Calender";
import RentalDialog from "../_components/RentalDialog";

const RentalClient = () => {
  const [selectedCarId, setSelectedCarId] = useState<string>("all");
  const [selectedRental, setSelectedRental] = useState<Rental | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedRental, setEditedRental] = useState<Rental | null>(null);

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
    setIsEditing(true);
    setEditedRental(selectedRental); // Düzenleme için seçili kiralama bilgilerini al
  };

  const handleSave = () => {
    if (editedRental) {
      // Burada düzenleme kaydetme işlemi yapılabilir
      console.log("Düzenleme kaydedildi:", editedRental);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedRental(null);
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

  if (loading) {
    return (
      <div className="flex items-center justify-center w-full h-screen">
        <FaSpinner className="animate-spin text-4xl" />
      </div>
    );
  }

  return (
    <Box sx={{ width: "100%", padding: 2 }}>
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

      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
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

      <Box
        sx={{
          display: "flex",
          flexDirection: {
            xs: "column",
            md: "row",
          },
          alignItems: "stretch",
          gap: 2,
        }}
      >
        <TableContainer
          component={Paper}
          sx={{
            boxShadow: 3,
            borderRadius: 2,
            flex: {
              xs: "none",
              md: 2,
            },
            width: {
              xs: "100%",
              md: "auto",
            },
          }}
        >
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
              {filteredRentals.map((rental) => {
                const isSelected = selectedRental?.id === rental.id;

                return (
                  <TableRow
                    key={rental.id}
                    sx={{
                      cursor: "pointer",
                      backgroundColor: isSelected ? "#4b77de" : "inherit",
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
                    <TableCell align="center">
                      <Stack
                        direction="row"
                        spacing={1}
                        justifyContent="center"
                      >
                        <Tooltip title="Düzenle">
                          <span>
                            <IconButton
                              sx={{
                                color: isSelected ? "#fff" : "primary.main",
                              }}
                              onClick={handleEditClick}
                            >
                              <AiOutlineEdit />
                            </IconButton>
                          </span>
                        </Tooltip>
                        <Tooltip title="Sil">
                          <IconButton
                            sx={{
                              color: isSelected ? "#fff" : "error.main",
                            }}
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
            flex: {
              xs: "none",
              md: 1,
            },
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "center",
            gap: 2,
            width: {
              xs: "100%",
              md: "auto",
            },
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
              <Typography variant="h6" gutterBottom>
                Randevu Detayı
              </Typography>
              <Typography>
                Kiralama Tarihi:{" "}
                {new Date(selectedRental.rentalDate).toLocaleDateString()}
              </Typography>
              <Typography>
                Teslim Tarihi:{" "}
                {new Date(selectedRental.returnDate).toLocaleDateString()}
              </Typography>
              <Typography>Toplam Gün: {rentalDays}</Typography>
              <Typography>Günlük Ücret: {dailyPrice} ₺</Typography>
              <Typography fontWeight="bold">
                Toplam Ücret: {totalPrice} ₺
              </Typography>
            </Box>
          )}
        </Box>
        <RentalDialog
          isEditing={isEditing}
          handleCancel={handleCancel}
          handleSave={handleSave}
          editedRental={editedRental}
          setEditedRental={setEditedRental}
        />
      </Box>
    </Box>
  );
};

export default RentalClient;
