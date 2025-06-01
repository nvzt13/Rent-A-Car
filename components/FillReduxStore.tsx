"use client";
import { fetchCars } from "@/lib/redux/slice/carSlice";
import React, { useEffect } from "react";
import { useAppDispatch } from "@/lib/redux/hooks";
import { fetchRentals } from "@/lib/redux/slice/rentalSlice";

const FillReduxStore = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchCars());
    dispatch(fetchRentals());
  }, [dispatch]);
  return <div></div>;
};

export default FillReduxStore;
