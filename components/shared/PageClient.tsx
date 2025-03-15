"use client";

import React, { useEffect } from 'react';
import CarCard from "@/components/shared/Card";
import Grid from '@mui/material/Grid';
import Skeleton from '@mui/material/Skeleton';
import { useAppSelector } from '@/lib/hooks';
import { useDispatch } from 'react-redux';
import { setCars } from '@/lib//slice/carSlice';  // Import the action

const PageClient = () => {
  const dispatch = useDispatch();
  const cars = useAppSelector((state) => state.cars.cars); // cars slice'ını store'dan alıyoruz

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await fetch('/api/v1/car');
        if (response.ok) {
          const carsData = await response.json();
          dispatch(setCars(carsData.data));
        } else {
          alert('Arabalar yolda kaldı');
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchCards();
  }, [dispatch]);

  return (
    <div style={{ backgroundColor: 'black', padding: '20px', minHeight: '100vh' }}>
      <Grid container spacing={2}>
        {
          cars && cars.length > 0 ? cars.map((car) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={car.id}>
              <CarCard car={car} key={car.id} />
            </Grid>
          )) : (
            Array.from(new Array(8)).map((_, index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                <Skeleton 
                  variant="rectangular" 
                  width="100%" 
                  height={150} 
                  sx={{ bgcolor: 'grey.800' }} // Skeleton arka planı daha açık renk
                />
                <Skeleton width="60%" sx={{ bgcolor: 'grey.800' }} />
                <Skeleton width="80%" sx={{ bgcolor: 'grey.800' }} />
              </Grid>
            ))
          )
        }
      </Grid>
    </div>
  );
};

export default PageClient;