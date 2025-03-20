"use client"
import { fetchCars } from '@/lib/slice/carSlice';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';

const FillReduxStore = () => {

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCars())
  }, [dispatch]);
  return (
    <div></div>
  )
}

export default FillReduxStore