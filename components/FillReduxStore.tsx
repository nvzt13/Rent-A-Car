"use client"
import { fetchCars } from '@/lib/slice/carSlice';
import React, { useEffect } from 'react'
import { useAppDispatch } from "@/lib/hooks";
import { fetchRentals } from "@/lib/slice/rentalSlice";

const FillReduxStore = () => {

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchCars())
    dispatch(fetchRentals())
  }, [dispatch]);
  return (
    <div></div>
  )
}

export default FillReduxStore