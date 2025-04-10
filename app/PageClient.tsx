"use client";
import React, { useEffect, useState } from "react";
import CarCard from "@/app/_components/Card";
import { useAppSelector } from "@/lib/hooks";
import { Grid2 } from "@mui/material";
import { FaSpinner } from "react-icons/fa";
import { CarState } from "@/type/types";

const PageClient = () => {
  const [mounted, setMounted] = useState(false);
  const cars = useAppSelector(
    (state:{ cars: CarState}) => state.cars.cars
  );

useEffect(() => {
  setMounted(true);
}, []);

if (!mounted) {
  return (
    <div className='flex items-center justify-center w-full h-screen'>
      <FaSpinner className='animate-spin text-4xl' />
    </div>
  );
}

  return (
    <div
      style={{ backgroundColor: "#fff", padding: "20px", minHeight: "100vh" }}
    >
        <Grid2
          container
          spacing={3}
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
            },
            justifyContent: "center",
            alignItems: "flex-start",
            maxWidth: "1400px",
            mx: "auto",
            gap: "30px",
          }}
        >
          {cars.map((car) => (
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
