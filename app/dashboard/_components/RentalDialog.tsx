import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
} from "@mui/material";

interface RentalDialogProps {
  isEditing: boolean;
  handleCancel: () => void;
  handleSave: (editedRental: any) => void;
  editedRental: any;
  setEditedRental: React.Dispatch<React.SetStateAction<any>>;
}

const RentalDialog: React.FC<RentalDialogProps> = ({
  isEditing,
  handleCancel,
  handleSave,
  editedRental,
  setEditedRental,
}) => {
  return (
    <Dialog open={isEditing} onClose={handleCancel}>
      <DialogTitle>Randevu Düzenle</DialogTitle>
      <DialogContent>
        {editedRental && (
          <>
            <TextField
              label="Müşteri Adı"
              value={editedRental.customerName}
              fullWidth
              margin="normal"
              onChange={(e) =>
                setEditedRental({
                  ...editedRental,
                  customerName: e.target.value,
                })
              }
            />
            <TextField
              label="Telefon"
              value={editedRental.phoneNumber}
              fullWidth
              margin="normal"
              onChange={(e) =>
                setEditedRental({
                  ...editedRental,
                  phoneNumber: e.target.value,
                })
              }
            />
            {/* Diğer düzenlemeler buraya eklenebilir */}
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel} color="primary">
          Vazgeç
        </Button>
        <Button
          onClick={() => handleSave(editedRental)} // Save işlemi burada
          color="primary"
        >
          Kaydet
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RentalDialog;
