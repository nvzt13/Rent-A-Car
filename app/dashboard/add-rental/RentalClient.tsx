"use client";
import React, { useState } from "react";
import { useAppSelector } from "@/lib/hooks";
import { Rental } from "@prisma/client";
import { AiOutlineCheckCircle, AiOutlineDelete, AiOutlinePlusCircle } from "react-icons/ai"; // İkonları ekleyelim
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const RentalClient = () => {
  const { rentals, loadingRental } = useAppSelector((state: { rentals: { rentals: Rental[], loadingRental: boolean } }) => ({
    rentals: state.rentals.rentals,
    loadingRental: state.rentals.loadingRental
  }));

  // Onaylama ve silme işlevlerini ekleyelim
  const handleApprove = (id: number) => {
    console.log(`Randevu onaylandı: ${id}`);
    // Onaylama işlemi burada yapılacak (örneğin API çağrısı)
  };

  const handleDelete = (id: number) => {
    console.log(`Randevu silindi: ${id}`);
    // Silme işlemi burada yapılacak (örneğin API çağrısı)
  };

  // Formu açıp kapatmak için state
  const [open, setOpen] = useState(false);
  const [newRental, setNewRental] = useState({
    customerName: '',
    rentalDate: '',
    takeHour: '',
    deliveryHour: '',
    status: ''
  });

  const handleClickOpen = () => {
    setOpen(true); // Formu aç
  };

  const handleClose = () => {
    setOpen(false); // Formu kapat
  };

  const handleChange = (e) => {
    setNewRental({ ...newRental, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    console.log("Yeni Randevu Eklendi:", newRental);
    // Burada API çağrısı yapılabilir
    handleClose();
  };

  if (loadingRental) {
    return <p>Yükleniyor...</p>;
  }

  return (
    <div className="container mx-auto mt-5">
      <h1 className="text-2xl font-bold mb-4">Randevular</h1>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border">Müşteri Adı</th>
            <th className="py-2 px-4 border">Tarih</th>
            <th className="py-2 px-4 border">Alış Saati</th>
            <th className="py-2 px-4 border">Teslim Saati</th>
            <th className="py-2 px-4 border">Durum</th>
            <th className="py-2 px-4 border">İşlemler</th>
          </tr>
        </thead>
        <tbody>
          {rentals.map((rental) => (
            <tr key={rental.id}>
              <td className="py-2 px-4 border">{rental.customerName}</td>
              <td className="py-2 px-4 border">{new Date(rental.rentalDate).toLocaleDateString()}</td>
              <td className="py-2 px-4 border">{rental.takeHour}</td>
              <td className="py-2 px-4 border">{rental.deliveryHour}</td>
              <td className="py-2 px-4 border">{rental.status}</td>
              <td className="py-2 px-4 border flex space-x-2">
                <AiOutlineCheckCircle
                  className="text-green-500 cursor-pointer"
                  size={24}
                  onClick={() => handleApprove(rental.id)}
                  title="Onayla"
                />
                <AiOutlineDelete
                  className="text-red-500 cursor-pointer"
                  size={24}
                  onClick={() => handleDelete(rental.id)}
                  title="Sil"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Artı butonu */}
      <div className="flex justify-end mt-4">
        <AiOutlinePlusCircle
          className="text-blue-500 cursor-pointer"
          size={36}
          onClick={handleClickOpen}
          title="Yeni Randevu Ekle"
        />
      </div>

      {/* Form içeren Dialog */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Yeni Randevu Ekle</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="customerName"
            name="customerName"
            label="Müşteri Adı"
            fullWidth
            variant="standard"
            value={newRental.customerName}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            id="rentalDate"
            name="rentalDate"
            label="Tarih"
            type="date"
            fullWidth
            variant="standard"
            value={newRental.rentalDate}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            id="takeHour"
            name="takeHour"
            label="Alış Saati"
            fullWidth
            variant="standard"
            value={newRental.takeHour}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            id="deliveryHour"
            name="deliveryHour"
            label="Teslim Saati"
            fullWidth
            variant="standard"
            value={newRental.deliveryHour}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            id="status"
            name="status"
            label="Durum"
            fullWidth
            variant="standard"
            value={newRental.status}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>İptal</Button>
          <Button onClick={handleSubmit}>Kaydet</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default RentalClient;