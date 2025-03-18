"use client";

import React from 'react';
import { useRouter } from 'next/navigation'; // Import Next.js router for navigation
import CarCard from "@/components/shared/Card";
import Skeleton from '@mui/material/Skeleton';
import { useAppSelector } from '@/lib/hooks';
import { Grid2, Button } from '@mui/material'; // Added Button import
import { Car } from '@prisma/client';

const PageClient = () => {
  const cars = useAppSelector((state: { cars: { cars: Car[] } }) => state.cars.cars); 
  const router = useRouter(); // Initialize the Next.js router

  const handleSingleCarComponent = (car: Car) => {
    router.push(`/single-car/${car.id}`);
  };

  if(cars.length === 0) {
    return <div>Not Car Found</div>
  }

  return (
    <div style={{ backgroundColor: '#fff', padding: '20px', minHeight: '100vh' }}>
      <Grid2 
        container 
        spacing={1} 
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
              <Button onClick={() => handleSingleCarComponent(car)}> 
                <CarCard car={car} />
              </Button>
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