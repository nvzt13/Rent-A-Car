"use client"
import { setCars } from '@/lib/slice/carSlice';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';

const FillReduxStore = () => {

  const dispatch = useDispatch();
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
    <div></div>
  )
}

export default FillReduxStore