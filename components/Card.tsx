"use client";
import SettingsIcon from "@mui/icons-material/Settings";
import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";
import DriveEtaIcon from "@mui/icons-material/DriveEta";
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";
import SpeedIcon from "@mui/icons-material/Speed";
import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CurrencyLiraIcon from "@mui/icons-material/CurrencyLira";
import { Car } from "@prisma/client";
import Link from "next/link";

// Function to set dynamic chip colors based on car type
const getChipColor = (carType: string) => {
  switch (carType) {
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
      height: "100%", // Kartların eşit yükseklikte olması için eklendi
      borderRadius: 4,
      boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)", // Daha yumuşak gölgeler
      display: "flex", // Flexbox kullanarak kartı uzatıyoruz
      flexDirection: "column", // İçerik dikey olarak düzenlenecek
      justifyContent: "space-between", // İçerik eşit şekilde dağıtılacak
      m: 2,
      overflow: "hidden",
      position: "relative",
      transition: "transform 0.3s ease", // Hover animasyonu
      "&:hover": {
        transform: "scale(1.02)", // Kart üzerine gelince büyüsün
      },
    }}
  >
    <Chip
      label={car.carType}
      color={getChipColor(car.carType)}
      sx={{ position: "absolute", top: 10, right: 10, zIndex: 1 }}
    />
    {/* Car image */}
    <CardMedia
      component="img"
      sx={{
        height: "100%", // Daha sabit bir boyut
        objectFit: "cover", // Görseli sabitlemek için
        objectPosition: "center",
        pt:5,

      }}
      image={car.image}
      title={car.name}
    />
    <Box sx={{ bgcolor: "#f9f9f9", p: 2, flexGrow: 1 }}>
      <CardContent sx={{ height: "100%" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          {/* Car name */}
          <Typography
            variant="h6"
            component="div"
            sx={{
              fontWeight: "bold",
              color: "#333",
              whiteSpace: "nowrap", // Tek satırda sınırla
              overflow: "hidden", // Fazla metin taşırsa gizle
              textOverflow: "ellipsis", // Fazla metni üç nokta ile belirt
            }}
          >
            {car.name}
          </Typography>
          {/* Price */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              fontSize: "24px",
              fontWeight: "bold",
              color: "green",
            }}
          >
            {car.price}
            <CurrencyLiraIcon fontSize="large" />
          </Box>
        </Box>

        {/* Car details */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: 2,
            mb: 2,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <SpeedIcon sx={{ mr: 1 }} />
            <Typography variant="body2">{car.km} km</Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <DriveEtaIcon sx={{ mr: 1 }} />
            <Typography variant="body2">{car.carModel}</Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <LocalGasStationIcon sx={{ mr: 1 }} />
            <Typography variant="body2">{car.fuelType}</Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <SettingsIcon sx={{ mr: 1 }} />
            <Typography variant="body2">{car.gear}</Typography>
          </Box>
        </Box>
      </CardContent>

      {/* Contact Buttons */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: 2,
          p: 2,
          borderTop: "1px solid #e0e0e0",
          backgroundColor: "#fff",
        }}
      >
        <Link href={`/single-car/${car.id}`} passHref>
          <Button
            variant="contained"
            color="primary"
            size="large"
            sx={{ px: 3 }}
          >
            İncele
          </Button>
        </Link>
        <Link href={`/create-rental/${car.id}`} passHref>
          <Button
            variant="outlined"
            color="success"
            size="large"
            sx={{ px: 3 }}
          >
            Kirala
          </Button>
        </Link>
      </Box>
    </Box>
  </Card>
  );
}
