"use client";
import React, { useState, useMemo } from "react";
import { useAppSelector, useAppDispatch } from "@/lib/redux/hooks";
import { deleteRental, updateRental } from "@/lib/redux/slice/rentalSlice";
import { RentalState } from "@/type/types";
import { alpha } from "@mui/material/styles";
import { Rental, Car } from "@prisma/client";
import {
  Box,
  Stack,
  Paper,
  Table,
  Select,
  Tooltip,
  MenuItem,
  Typography,
  TableRow,
  TableCell,
  TableHead,
  TableBody,
  TableContainer,
  FormControl,
  InputLabel,
  Button,
} from "@mui/material";
import { FaSpinner } from "react-icons/fa";

import Calender from "../_components/Calender";

const RentalClient = () => {
  const [selectedCarId, setSelectedCarId] = useState<string>("all");
  const [selectedRental, setSelectedRental] = useState<Rental | null>(null);

  const dispatch = useAppDispatch();
  const rawRentals = useAppSelector(
    (state: { rentals: RentalState }) => state.rentals.rentals
  );
  const rentals = useMemo(() => {
    if (Array.isArray(rawRentals)) return rawRentals;
    if (rawRentals) return [rawRentals];
    return [];
  }, [rawRentals]);
  const loading = useAppSelector(
    (state: { rentals: RentalState }) => state.rentals.loadingRental
  );
  const cars = useAppSelector(
    (state: { cars: { cars: Car[]; loading: boolean } }) => state.cars.cars
  );

  const filteredRentals = useMemo(() => {
    return selectedCarId === "all"
      ? rentals
      : rentals.filter((rental) => rental.carId === Number(selectedCarId));
  }, [selectedCarId, rentals]);

  // Calculate today's date and upcoming rentals
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayDate = new Date().toISOString().split("T")[0];

  const upcomingRentals = useMemo(() => {
    return filteredRentals.filter((rental) => {
      const rentalDate = new Date(rental.rentalDate)
        .toISOString()
        .split("T")[0];
      return rentalDate >= todayDate;
    });
  }, [filteredRentals, todayDate]);

  // Busy dates calculation
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

  if (loading) {
    return (
      <div className="flex items-center justify-center w-full h-screen">
        <FaSpinner className="animate-spin text-4xl" />
      </div>
    );
  }

  return (
    <div>
      <Box
        sx={{
          width: "100%",
          padding: 2,
          backgroundColor: (theme) =>
            alpha(theme.palette.background.default, 1),
        }}
      >
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
          <TableContainer
            component={Paper}
            sx={{ boxShadow: 3, borderRadius: 2, flex: 2 }}
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
                  <TableCell>
                    <Typography fontWeight="bold">Kalan Gün</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography fontWeight="bold">İşlemler</Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {upcomingRentals.map((rental) => {
                  const rentalDate = new Date(rental.rentalDate);
                  const daysLeft = Math.ceil(
                    (rentalDate.getTime() - today.getTime()) /
                      (1000 * 3600 * 24)
                  );

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
                        <Stack
                          direction="row"
                          spacing={1}
                          justifyContent="center"
                        >
                          <Tooltip title="Onayla">
                            {rental.isAprove ? (
                              <Button
                                variant="contained"
                                color="warning"
                                size="small"
                                onClick={() => {
                                  // Call updateRental with the necessary parameters
                                  dispatch(updateRental(rental.id));
                                }}
                              >
                                Geri Al
                              </Button>
                            ) : (
                              <Button
                                variant="contained"
                                color="success"
                                size="small"
                                onClick={() => {
                                  // Call updateRental with the necessary parameters
                                  dispatch(updateRental(rental.id));
                                }}
                              >
                                Onayla
                              </Button>
                            )}
                          </Tooltip>
                          <Tooltip title="Sil">
                            <Button
                              variant="contained"
                              color="error"
                              size="small"
                              onClick={() => {
                                // Call updateRental with the necessary parameters
                                dispatch(deleteRental(rental.id));
                              }}
                            >
                              {" "}
                              Sil
                            </Button>
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
              color: "text.primary",
            }}
          >
            <Calender busyDates={selectedRental ? busyDates : []} />

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
        </Box>
      </Box>
    </div>
  );
};

export default RentalClient;
