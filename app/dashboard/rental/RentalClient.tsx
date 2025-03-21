"use client";
import React, { useState } from "react";
import { useAppSelector } from "@/lib/hooks";
import { Rental } from "@prisma/client";
import { 
  AiOutlineCheckCircle, 
  AiOutlineDelete, 
  AiOutlinePlusCircle
} from "react-icons/ai";
import { 
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, 
  Paper, Dialog, DialogActions, DialogContent, DialogTitle, 
  Button, IconButton, CircularProgress, TextField 
} from "@mui/material";

const RentalClient = () => {
  const { rentals, loadingRental } = useAppSelector((state: { rentals: { rentals: Rental[], loadingRental: boolean } }) => ({
    rentals: state.rentals.rentals,
    loadingRental: state.rentals.loadingRental
  }));
console.log(rentals)
  const handleApprove = (id: number) => {
    console.log(`Randevu onaylandı: ${id}`);
  };

  const handleDelete = (id: number) => {
    console.log(`Randevu silindi: ${id}`);
  };

  const [open, setOpen] = useState(false);
  const [newRental, setNewRental] = useState({
    customerName: '',
    rentalDate: '',
    takeHour: '',
    deliveryHour: '',
    status: ''
  });

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    setNewRental({ ...newRental, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    console.log("Yeni Randevu Eklendi:", newRental);
    handleClose();
  };

  if (loadingRental) {
    return (
      <div style={{ textAlign: 'center', padding: '20px' }}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className="container mx-auto mt-5">
      <h1 className="text-2xl font-bold mb-4">Randevular</h1>

      <Button 
        variant="contained" 
        color="primary" 
        onClick={handleClickOpen} 
        startIcon={<AiOutlinePlusCircle />}
      >
        Yeni Randevu Ekle
      </Button>

      <TableContainer component={Paper} className="mt-4">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Müşteri Adı</TableCell>
              <TableCell>Alış</TableCell>
              <TableCell>Teslim</TableCell>
              <TableCell>Alış Saati</TableCell>
              <TableCell>Teslim Saati</TableCell>
              <TableCell>Durum</TableCell>
              <TableCell>İşlemler</TableCell>
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
                <TableCell>{rental.status}</TableCell>
                <TableCell>
                  <IconButton color="success" onClick={() => handleApprove(rental.id)}>
                    <AiOutlineCheckCircle />
                  </IconButton>
                  <IconButton color="error" onClick={() => handleDelete(rental.id)}>
                    <AiOutlineDelete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Dialog for adding new rental */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Yeni Randevu Ekle</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="customerName"
            label="Müşteri Adı"
            type="text"
            fullWidth
            variant="outlined"
            value={newRental.customerName}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="rentalDate"
            label="Tarih"
            type="date"
            fullWidth
            variant="outlined"
            value={newRental.rentalDate}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="takeHour"
            label="Alış Saati"
            type="time"
            fullWidth
            variant="outlined"
            value={newRental.takeHour}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="deliveryHour"
            label="Teslim Saati"
            type="time"
            fullWidth
            variant="outlined"
            value={newRental.deliveryHour}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="status"
            label="Durum"
            type="text"
            fullWidth
            variant="outlined"
            value={newRental.status}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">İptal</Button>
          <Button onClick={handleSubmit} color="primary">Ekle</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default RentalClient;
