"use client"
import React, {useEffect, useState} from 'react'
import Car from '@prisma/client'
import CarCard from "@/components/shared/Card"
import Grid from '@mui/material/Grid';

const PageClient = () => {
  const [cars, setCars] = useState<Car[]>([])
  useEffect(() => {
    const fetchCards = async () => {
      try{
        const response = await fetch('/api/v1/car')
        if(response.ok){
          const carsData = await response.json()
          setCars(carsData.data)
          console.log(cars)
        } else {
          alert('Arabalar yolda kaldi')
        }
      } catch(error) {
        console.log(error)
      }
    }
    fetchCards();
  }, [])
  
  return (

<Grid container spacing={2}>
  {
    cars && cars.length > 0 ? cars.map((car) => (
      <Grid item xs={12} sm={6} md={4} lg={3} key={car.id}>
        <CarCard car={car} key={car.id} />
      </Grid>
    )) : "Loading..."
  }
</Grid>
  )
}

export default PageClient