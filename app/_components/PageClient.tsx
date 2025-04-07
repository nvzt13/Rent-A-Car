"use client";

import React, { useEffect } from "react";
import CarCard from "@/app/_components/Card";
import Skeleton from "@mui/material/Skeleton";
import { useAppSelector } from "@/lib/hooks";
import { Grid2 } from "@mui/material"; // Added Button import
import { Car } from "@prisma/client";

const PageClient = () => {
  const cars = useAppSelector((state: { cars: { cars: Car[], loading: boolean } }) => state.cars.cars);
  const loading = useAppSelector((state: { cars: { cars: Car[], loading: boolean } }) => state.cars.loading);
  
  useEffect(() => {
    const data = {
      id: 578,
      name: "admin",
      password: "1234"
    }
 const addAdmin = async () => {
  try {
    const token = localStorage.getItem('token');
    const res = await fetch('/api/v1/admin', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: "admin",
        password: "1234"
      })
    });
    
    if (res.ok) {
      alert("Admin eklendi");
    } else {
      // Hata mesajını json olarak alalım
      const errorData = await res.json(); // JSON yanıtı bekliyoruz
      alert("Olumsuz");
      console.log("Hata Mesajı:", errorData.message || errorData); // Gelen hata mesajını yazdır
    }
  } catch (error) {
    console.log("Beklenmeyen Hata:", error); // Eğer fetch atarken bir hata olursa burada yakalarız
  }
}
 
  }, [])
  
  return (
    <div style={{ backgroundColor: "#fff", padding: "20px", minHeight: "100vh" }}>
      <Grid2
        container
        spacing={3}
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr", // Mobilde tek sütun
            sm: "repeat(2, 1fr)", // Küçük ekranlarda 2 sütun
            md: "repeat(3, 1fr)", // Orta boy ekranlarda 3 sütun
          },
          justifyContent: "center",
          alignItems: "flex-start",
          maxWidth: "1400px",
          mx: "auto",
          gap: "30px",
        }}
      >
        {loading
          ? Array.from(new Array(8)).map((_, index) => (
              <Grid2
                key={index}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  width: "100%",
                }}
              >
                <div style={{ width: "90%" }}>
                  <Skeleton
                    variant="rectangular"
                    width="100%"
                    height={150}
                    sx={{ bgcolor: "grey.800", mb: 2 }}
                  />
                  <Skeleton width="60%" sx={{ bgcolor: "grey.800", mb: 1 }} />
                  <Skeleton width="80%" sx={{ bgcolor: "grey.800" }} />
                </div>
              </Grid2>
            ))
          : cars.map((car) => (
              <Grid2
                key={car.id}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  width: "100%",
                }}
              >
                <CarCard car={car} />
              </Grid2>
            ))}
      </Grid2>
    </div>
  );
};

export default PageClient;
