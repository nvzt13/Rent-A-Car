"use client";

import React, { useEffect, useState } from "react";
import { useAppSelector } from "@/lib/redux/hooks";
import { Car } from "@prisma/client";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Divider,
} from "@mui/material";
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";
import DriveEtaIcon from "@mui/icons-material/DriveEta";
import SpeedIcon from "@mui/icons-material/Speed";
import SettingsIcon from "@mui/icons-material/Settings";
import CurrencyLiraIcon from "@mui/icons-material/CurrencyLira";

const getChipColor = (model: string) => {
  switch (model) {
    case "Ekonomi":
      return "success";
    case "SUV":
      return "primary";
    case "Premium":
      return "warning";
    default:
      return "default";
  }
};

const SingleCarClient = ({ id }: { id: string }) => {
  const cars = useAppSelector(
    (state: { cars: { cars: Car[] } }) => state.cars.cars
  );
  const [car, setCar] = useState<Car | null>(null);

  useEffect(() => {
    if (id && cars.length > 0) {
      const selectedCar = cars.find((car) => car.id == Number(id));
      setCar(selectedCar || null);
    }
  }, [id, cars]);

  if (!car) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Typography variant="h5" fontWeight="bold">
          Car not found
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      maxWidth="lg"
      mx="auto"
      py={4}
      px={2}
      display="flex"
      flexDirection="column"
      alignItems="center"
    >
      {/* Car Card */}
      <Card
        sx={{
          borderRadius: 4,
          boxShadow: 4,
          width: "100%",
          maxWidth: "600px",
          mb: 4,
        }}
      >
        <CardMedia
          component="img"
          height="250"
          image={car.image}
          alt={car.name}
          sx={{ borderRadius: "4px 4px 0 0" }}
        />
        <CardContent>
          <Typography
            variant="h5"
            fontWeight="bold"
            color="text.primary"
            textAlign="center"
            mb={2}
          >
            {car.name}
          </Typography>
          <Divider />
          <Box
            display="flex"
            justifyContent="space-around"
            alignItems="center"
            mt={2}
            flexWrap="wrap"
          >
            <Box display="flex" alignItems="center" flexDirection="column">
              <LocalGasStationIcon />
              <Typography variant="body2">{car.fuelType}</Typography>
            </Box>
            <Box display="flex" alignItems="center" flexDirection="column">
              <DriveEtaIcon />
              <Typography variant="body2">{car.carType}</Typography>
            </Box>
            <Box display="flex" alignItems="center" flexDirection="column">
              <SpeedIcon />
              <Typography variant="body2">
                {car.km.toLocaleString()} km
              </Typography>
            </Box>
            <Box display="flex" alignItems="center" flexDirection="column">
              <SettingsIcon />
              <Typography variant="body2">{car.gear}</Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Pricing Section */}
      <Card
        sx={{ borderRadius: 4, boxShadow: 4, width: "100%", maxWidth: "600px" }}
      >
        <CardContent>
          <Typography
            variant="h5"
            fontWeight="bold"
            color="text.primary"
            mb={2}
            textAlign="center"
          >
            Pricing & Availability
          </Typography>
          <Divider />
          <Typography
            variant="h6"
            color="text.primary"
            mt={2}
            textAlign="center"
          >
            Price: {car.price}{" "}
            <CurrencyLiraIcon
              fontSize="small"
              sx={{ verticalAlign: "middle" }}
            />{" "}
            / day
          </Typography>
          <Box display="flex" justifyContent="center" mt={2}>
            <Chip
              label={car.carType}
              color={getChipColor(car.carType)}
              sx={{ fontSize: "1rem" }}
            />
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default SingleCarClient;
