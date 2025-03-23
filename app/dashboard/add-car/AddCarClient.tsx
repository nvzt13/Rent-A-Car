"use client";
import React, { useState } from "react";
import {
  TextField,
  Button,
  MenuItem,
  Typography,
  Box,
  Card,
  CardMedia,
} from "@mui/material";
import { CreateCar } from "@/type/types";
import { useSearchParams } from "next/navigation";

const AddCar = () => {
  const searchParams = useSearchParams();
  const carToBeUpdated = searchParams.get("update-car");
  const parseCarToBeUpdated = carToBeUpdated
    ? JSON.parse(decodeURIComponent(carToBeUpdated))
    : null;

  const [carData, setCarData] = useState<CreateCar>({
    name: parseCarToBeUpdated?.name || "",
    carModel: parseCarToBeUpdated?.carModel || "",
    fuelType: parseCarToBeUpdated?.fuelType || "",
    km: parseCarToBeUpdated?.km || "",
    price: parseCarToBeUpdated?.price || "",
    carType: parseCarToBeUpdated?.carType || "",
    image: parseCarToBeUpdated?.image || "",
    gear: parseCarToBeUpdated?.gear || "",
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fuelTypes = ["Benzin", "Diesel", "Electric", "Hybrid"];
  const gear = ["Manel", "Otomatik"];
  const carModel = ["Premium", "Ekonomi", "Suv"];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "image") {
      setCarData({
        ...carData,
        [name]: value,
      });

      setImagePreview(value);
    } else {
      setCarData({
        ...carData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(carData).forEach(([key, value]) => {
      formData.append(key, String(value ?? ""));
    });
    for (const pair of formData.entries()) {
      console.log(`${pair[0]}: ${pair[1]}`);
    }

    const method = parseCarToBeUpdated ? "PUT" : "POST";
    try {
      const response = await fetch(
        `/api/v1/car/${parseCarToBeUpdated ? parseCarToBeUpdated.id : ""}`,
        {
          method: method,
          body: formData,
        }
      );

      if (response.ok) {
        alert(
          parseCarToBeUpdated
            ? "Update car successfuly"
            : "Car added successfully"
        );
        console.log(response);
      } else {
        alert("Failed to add car");
        console.log(response);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error adding car");
      console.log(error);
    }
  };

  return (
    <div>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          maxWidth: 400,
          mx: "auto",
          mt: 4,
          p: 3,
          bgcolor: "#f7f7f7",
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Typography variant="h5" gutterBottom align="center" color="primary">
          {carToBeUpdated ? "Update Car" : "Add Car"}
        </Typography>
        <TextField
          label="Car Name"
          name="name"
          value={carData.name}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Model"
          name="carModel"
          value={carData.carModel}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Fuel Type"
          name="fuelType"
          value={carData.fuelType}
          onChange={handleInputChange}
          select
          fullWidth
          margin="normal"
          required
        >
          {fuelTypes.map((type) => (
            <MenuItem key={type} value={type}>
              {type}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          label="Car Type"
          name="carType"
          value={carData.carType}
          onChange={handleInputChange}
          select
          fullWidth
          margin="normal"
          required
        >
          {carModel.map((type) => (
            <MenuItem key={type} value={type}>
              {type}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          label="Kilometers"
          name="km"
          value={carData?.km}
          onChange={handleInputChange}
          type="number"
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Price"
          name="price"
          value={carData?.price}
          onChange={handleInputChange}
          type="number"
          fullWidth
          margin="normal"
          required
        />
<TextField
  label="Fites"
  name="gear" // Change to "gear" to match state
  value={carData.gear} // Correctly bind the value
  onChange={handleInputChange} // Handle input change
  select
  fullWidth
  margin="normal"
  required
>
  {gear.map((item) => (
    <MenuItem key={item} value={item}>
      {item}
    </MenuItem>
  ))}
</TextField>
        <TextField
          label="URL"
          name="image"
          value={carData.image}
          onChange={handleInputChange}
          type="text"
          fullWidth
          margin="normal"
          required
        />

        {imagePreview && (
          <Card sx={{ my: 2 }}>
            <CardMedia
              component="img"
              image={imagePreview}
              alt="Car Image Preview"
              sx={{ height: 150 }}
            />
          </Card>
        )}

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ py: 1.5 }}
        >
          {parseCarToBeUpdated ? "Update Car" : "Add Car"}
        </Button>
      </Box>
    </div>
  );
};

export default AddCar;
