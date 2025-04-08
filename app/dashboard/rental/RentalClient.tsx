"use client";
import React, { useState } from "react";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import RentalFormDialog from "./RentalFormDialog";
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
import {
  AiOutlineCheckCircle,
  AiOutlineDelete,
  AiOutlineLoading3Quarters,
  AiOutlineArrowLeft,
  AiOutlineEdit,
} from "react-icons/ai";
import { deleteRental, updateRental } from "@/lib/slice/rentalSlice";

const RentalClient = () => {
  const [loadingAprove, setLoadingAprove] = useState<{ [key: number]: boolean }>({});
  const [filter, setFilter] = useState<"all" | "approved" | "unapproved">("all");
  const [selectedCarId, setSelectedCarId] = useState<string>("all");
  const [open, setOpen] = useState(false);
  const [selectedRental, setSelectedRental] = useState<Rental | null>(null);

  const dispatch = useAppDispatch();
  const rentals = useAppSelector((state: { rentals: { rentals: Rental[] } }) => state.rentals.rentals);
  const cars = useAppSelector((state: { cars: { cars: Car[] } }) => state.cars.cars);

  if (!rentals?.length || !cars.length) {
    return <Typography>Yükleniyor...</Typography>;
  }

  const filteredRentals = rentals.filter((rental) => {
    const statusFilter =
      filter === "approved" ? rental.isAprove :
      filter === "unapproved" ? !rental.isAprove : true;

    const carFilter = selectedCarId === "all" ? true : rental.carId === selectedCarId;

    return statusFilter && carFilter;
  });

  const handleClickOpen = (rental: Rental) => {
    setSelectedRental(rental);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedRental(null);
  };

  return (
    <Box sx={{ width: "100%", padding: 2 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h4" gutterBottom>Randevular</Typography>

        <Stack direction="row" spacing={2}>
          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel id="filter-label">Durum</InputLabel>
            <Select
              labelId="filter-label"
              value={filter}
              label="Durum"
              onChange={(e) => setFilter(e.target.value as "all" | "approved" | "unapproved")}
            >
              <MenuItem value="all">Tümü</MenuItem>
              <MenuItem value="approved">Onaylı</MenuItem>
              <MenuItem value="unapproved">Onaysız</MenuItem>
            </Select>
          </FormControl>

          <FormControl size="small" sx={{ minWidth: 180 }}>
            <InputLabel id="car-filter-label">Araba</InputLabel>
            <Select
              labelId="car-filter-label"
              value={selectedCarId}
              label="Araba"
              onChange={(e) => setSelectedCarId(e.target.value)}
            >
              <MenuItem value="all">Tüm Arabalar</MenuItem>
              {cars?.map((car) => (
                <MenuItem key={car.id} value={car.id}>
                  {car.name} {car.carModel}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Stack>
      </Box>

      <TableContainer component={Paper} sx={{ boxShadow: 3, borderRadius: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><Typography fontWeight="bold">Müşteri Adı</Typography></TableCell>
              <TableCell><Typography fontWeight="bold">Alış</Typography></TableCell>
              <TableCell><Typography fontWeight="bold">Teslim</Typography></TableCell>
              <TableCell><Typography fontWeight="bold">Alış Saati</Typography></TableCell>
              <TableCell align="center"><Typography fontWeight="bold">İşlemler</Typography></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRentals.map((rental) => (
              <TableRow key={rental.id}>
                <TableCell>{rental.customerName}</TableCell>
                <TableCell>{new Date(rental.rentalDate).toLocaleDateString()}</TableCell>
                <TableCell>{new Date(rental.returnDate).toLocaleDateString()}</TableCell>
                <TableCell>{rental.takeHour}</TableCell>
                <TableCell align="center">
                  <Stack direction="row" spacing={1} justifyContent="center">
                    <Tooltip title={rental.isAprove ? "Onay Geri Al" : "Onayla"}>
                      <span>
                        <IconButton
                          color="success"
                          onClick={() => dispatch(updateRental(rental.id))}
                          disabled={loadingAprove[rental.id]}
                        >
                          {loadingAprove[rental.id] ? (
                            <AiOutlineLoading3Quarters className="animate-spin" />
                          ) : rental.isAprove ? (
                            "onayla"
                          ) : (
                            
                            "geri al"
                          )}
                        </IconButton>
                      </span>
                    </Tooltip>
                    <Tooltip title="Düzenle">
                      <IconButton color="primary" onClick={() => handleClickOpen(rental)}>
                        <AiOutlineEdit />
                      </IconButton>
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

      <RentalFormDialog open={open} onClose={handleClose} selectedRental={selectedRental} />
    </Box>
  );
};

export default RentalClient;