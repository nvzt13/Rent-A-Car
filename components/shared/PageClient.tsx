"use client";

import React, { useEffect } from 'react';
import CarCard from "@/components/shared/Card";
import Skeleton from '@mui/material/Skeleton';
import { useAppSelector } from '@/lib/hooks';
import { useDispatch } from 'react-redux';
import { setCars } from '@/lib/slice/carSlice';  
import {Grid2} from '@mui/material'; // Grid2'nin doğru yolu

const PageClient = () => {
  const dispatch = useDispatch();
  const cars = useAppSelector((state: { cars: { cars: any[] } }) => state.cars.cars); 

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
    <div style={{ backgroundColor: '#121212', padding: '20px', minHeight: '100vh' }}>
      <Grid2 
        container 
        spacing={3} 
        sx={{ 
          justifyContent: 'center',  
          alignItems: 'flex-start', 
        }}
      >
        {
          cars && cars.length > 0 ? cars.map((car) => (
            <Grid2 
              key={car.id} 
              sx={{
                display: 'flex', 
                justifyContent: 'center',  
                width: '100%',
                '@media (min-width: 600px)': {
                  width: '50%',
                },
                '@media (min-width: 900px)': {
                  width: '33.33%',
                },
                '@media (min-width: 1200px)': {
                  width: '25%',
                }
              }}
            >
              <CarCard car={car} />
            </Grid2>
          )) : (
            Array.from(new Array(8)).map((_, index) => (
              <Grid2 
                key={index}
                sx={{
                  display: 'flex', 
                  justifyContent: 'center',  
                  width: '100%',
                  '@media (min-width: 600px)': {
                    width: '50%',
                  },
                  '@media (min-width: 900px)': {
                    width: '33.33%',
                  },
                  '@media (min-width: 1200px)': {
                    width: '25%',
                  }
                }}
              >
                <div style={{ width: '90%' }}>
                  <Skeleton 
                    variant="rectangular" 
                    width="100%" 
                    height={150} 
                    sx={{ bgcolor: 'grey.800', mb: 2 }} 
                  />
                  <Skeleton width="60%" sx={{ bgcolor: 'grey.800', mb: 1 }} />
                  <Skeleton width="80%" sx={{ bgcolor: 'grey.800' }} />
                </div>
              </Grid2>
            ))
          )
        }
      </Grid2>
    </div>
  );
};

export default PageClient;
