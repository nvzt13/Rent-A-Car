"use client";

import React, { useEffect, useState } from 'react';
import { useAppSelector } from '@/lib/hooks';
import { Car } from '@prisma/client';
import { Box, Typography, Card, CardContent, CardMedia, Grid, Chip, Divider, List, ListItem, ListItemText } from '@mui/material';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import DriveEtaIcon from '@mui/icons-material/DriveEta';
import SpeedIcon from '@mui/icons-material/Speed';
import SettingsIcon from '@mui/icons-material/Settings';
import CurrencyLiraIcon from '@mui/icons-material/CurrencyLira';

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

const SingleCarClient = ({ id }: { id: number }) => {
  const cars = useAppSelector((state: { cars: { cars: Car[] } }) => state.cars.cars);
  const [car, setCar] = useState<Car | null>(null);

  useEffect(() => {
    if (id && cars.length > 0) {
      const selectedCar = cars.find((car) => car.id == id);
      setCar(selectedCar || null);
    }
  }, [id, cars]);

  if (!car) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Typography variant="h5" fontWeight="bold">Car not found</Typography>
      </Box>
    );
  }

  return (
    <Box maxWidth="lg" mx="auto" py={4} px={2}>
      {/* Car Header Section */}
      <Grid container spacing={4}>
          <Card sx={{ borderRadius: 4, boxShadow: 4 }}>
            <CardMedia
              component="img"
              height="250"
              image={car.image}
              alt={car.name}
              sx={{ borderRadius: '4px 4px 0 0' }}
            />
          
          </Card>

        <Grid item xs={12} md={7}>
          <Card sx={{ borderRadius: 4, boxShadow: 4 }}>
            <CardContent>
              <Typography variant="h5" fontWeight="bold" color="text.primary" mb={2}>
                Car Specifications
              </Typography>
              <Divider />
              <List sx={{ mt: 2 }}>
                <ListItem>
                  <ListItemText
                    primary="Fuel Type"
                    secondary={car.fuelType}
                    primaryTypographyProps={{ fontWeight: 'bold' }}
                  />
                  <LocalGasStationIcon sx={{ ml: 2, color: 'text.secondary' }} />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Car Type"
                    secondary={car.carType}
                    primaryTypographyProps={{ fontWeight: 'bold' }}
                  />
                  <DriveEtaIcon sx={{ ml: 2, color: 'text.secondary' }} />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="KM"
                    secondary={`${car.km.toLocaleString()} km`}
                    primaryTypographyProps={{ fontWeight: 'bold' }}
                  />
                  <SpeedIcon sx={{ ml: 2, color: 'text.secondary' }} />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Gear"
                    secondary={car.gear}
                    primaryTypographyProps={{ fontWeight: 'bold' }}
                  />
                  <SettingsIcon sx={{ ml: 2, color: 'text.secondary' }} />
                </ListItem>
              </List>
            </CardContent>
          </Card>
          <Card sx={{ borderRadius: 4, boxShadow: 4, mt: 4 }}>
            <CardContent>
              <Typography variant="h5" fontWeight="bold" color="text.primary" mb={2}>
                Pricing & Availability
              </Typography>
              <Divider />
              <Typography variant="h6" color="text.primary" mt={2}>
                Price: {car.price} <CurrencyLiraIcon fontSize="small" sx={{ verticalAlign: 'middle' }} /> / day
              </Typography>
              <Chip
                label={car.carType}
                color={getChipColor(car.carType)}
                sx={{ mt: 2, fontSize: '1rem' }}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SingleCarClient;
