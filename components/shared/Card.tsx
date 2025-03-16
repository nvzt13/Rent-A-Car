"use client";
import SettingsIcon from "@mui/icons-material/Settings";
import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import DriveEtaIcon from "@mui/icons-material/DriveEta";
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";
import SpeedIcon from "@mui/icons-material/Speed";
import Chip from "@mui/material/Chip"; // Etiket için
import Box from "@mui/material/Box";
import Button from "@mui/material/Button"; // WhatsApp butonu için
import WhatsAppIcon from "@mui/icons-material/WhatsApp"; // WhatsApp ikonu için
import CurrencyLiraIcon from "@mui/icons-material/CurrencyLira";
import PhoneIcon from "@mui/icons-material/Phone";
import type { Car } from "@prisma/client";

// Dinamik etiket rengi ve içeriği
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

export default function CarCard({ car }: { car: Car }) {
  return (
    <Card
      sx={{
        width: "100%",
        borderRadius: 5,
        boxShadow: 3,
        m: 2,
        position: "relative",
      }}
    >
      <Chip
        label={car.carType}
        color={getChipColor(car.carType)}
        sx={{ position: "absolute", top: 10, right: 10, zIndex: 1 }}
      />
      <CardMedia sx={{ height: 180 }} image={car.image} title="Car Image" />
      <Box
        sx={{
          bgcolor: "#e6f5f3",
        }}
      >
        <CardContent>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography gutterBottom variant="h5" component="div">
              {car.name}
            </Typography>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Box
                sx={{
                  height: "40px",
                  width: "1px",
                  backgroundColor: "#ccc",
                  marginRight: "16px",
                }}
              />
              <Box
                sx={{
                  fontSize: "24px",
                  fontWeight: "bold",
                  color: "green",
                  marginRight: "16px",
                }}
              >
                {car.price}
                <CurrencyLiraIcon />
              </Box>
            </Box>
          </Box>
        </CardContent>
        <CardActions sx={{ justifyContent: "space-between", padding: "16px" }}>
          <IconButton
            aria-label="km"
            sx={{ display: "flex", flexDirection: "column" }}
          >
            <SpeedIcon />
            <Typography variant="caption"> {car.km}</Typography>
          </IconButton>
          <IconButton
            aria-label="gearbox"
            sx={{ display: "flex", flexDirection: "column" }}
          >
            <DriveEtaIcon />
            <Typography variant="caption">{car.carModel}</Typography>
          </IconButton>
          <IconButton
            aria-label="fuel"
            sx={{ display: "flex", flexDirection: "column" }}
          >
            <LocalGasStationIcon />
            <Typography variant="caption">{car.fuelType}</Typography>
          </IconButton>
          <IconButton
            aria-label="gearbox"
            sx={{ display: "flex", flexDirection: "column" }}
          >
            <SettingsIcon />
            <Typography variant="caption">Manuel</Typography>
          </IconButton>
        </CardActions>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "16px",
            textAlign: "center",
          }}
        >
          {/* İlk buton: WhatsApp */}
          <Button
            variant="contained"
            color="success"
            startIcon={<WhatsAppIcon />}
            href="https://wa.me/5057453874"
          >
            Mesaj
          </Button>

          {/* İkinci buton: Arama yapmak için */}
          <Button
            variant="contained"
            color="primary"
            startIcon={<PhoneIcon />}
            href="tel:+905057453874"
            sx={{ marginLeft: "16px" }} // Butonlar arası boşluk
          >
            Ara
          </Button>
        </Box>
      </Box>
    </Card>
  );
}
