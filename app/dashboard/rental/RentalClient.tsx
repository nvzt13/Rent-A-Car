"use client"
import React, { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import { Rental } from "@prisma/client";
import {
  CircularProgress,
  IconButton,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Box,
  Stack,
  Tooltip,
} from "@mui/material";
import {
  AiOutlineCheckCircle,
  AiOutlineDelete,
  AiOutlineLoading3Quarters,
  AiOutlineArrowLeft,
} from "react-icons/ai";
import { deleteRental, updateRental } from "@/lib/slice/rentalSlice"; // Redux slice'a göre bir update fonksiyonu olmalı

const RentalClient = () => {
  const [loadingAprove, setLoadingAprove] = useState<{ [key: number]: boolean }>({});
  const rentals = useAppSelector((state: { rentals: { rentals: Rental[] } }) => state.rentals.rentals);
  const dispatch = useAppDispatch();
  return (
    <Box sx={{ width: "100%", padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        Randevular
      </Typography>
      <TableContainer component={Paper} sx={{ marginTop: 2, boxShadow: 3, borderRadius: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><Typography fontWeight="bold">Müşteri Adı</Typography></TableCell>
              <TableCell><Typography fontWeight="bold">Alış</Typography></TableCell>
              <TableCell><Typography fontWeight="bold">Teslim</Typography></TableCell>
              <TableCell><Typography fontWeight="bold">Alış Saati</Typography></TableCell>
              <TableCell><Typography fontWeight="bold">Teslim Saati</Typography></TableCell>
              <TableCell><Typography fontWeight="bold">Durum</Typography></TableCell>
              <TableCell align="center"><Typography fontWeight="bold">İşlemler</Typography></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rentals.map((rental) => (
              <TableRow key={rental.id}>
                <TableCell>{rental.customerName}</TableCell>
                <TableCell>{new Date(rental.rentalDate).toLocaleDateString()}</TableCell>
                <TableCell>{new Date(rental.returnDate).toLocaleDateString()}</TableCell>
                <TableCell>{rental.takeHour}</TableCell>
                <TableCell>{rental.deliveryHour}</TableCell>
                <TableCell>{rental.isAprove ? "Onaylandı" : "Beklemede"}</TableCell>
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
                            <AiOutlineArrowLeft />
                          ) : (
                            <AiOutlineCheckCircle />
                          )}
                        </IconButton>
                      </span>
                    </Tooltip>
                    <Tooltip title="Sil">
                      <IconButton color="error" onClick={() => dispatch(deleteRental(rental.id))}>
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
    </Box>
  );
};

export default RentalClient;
