"use client";

import React, { useEffect, useState } from 'react';
import { useAppSelector } from '@/lib/hooks'; // Assuming useAppSelector is your hook to access the Redux store
import { Car } from '@prisma/client';

const SingleCarClient = ({ id }: { id: number }) => {
  const cars = useAppSelector((state: { cars: { cars: Car[] } }) => state.cars.cars);
  const [car, setCar] = useState<Car | null>(null);

  useEffect(() => {
    if (id && cars.length > 0) {
      const selectedCar = cars.find((car) => car.id == id);
      setCar(selectedCar || null);
    }
  }, [id, cars]);

  if (!car) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl font-semibold">Car not found</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      {/* Car Header Section */}
      <div className="flex items-center space-x-6 mb-8">
        <img
          src={car.image}
          alt={car.name}
          className="w-96 h-60 object-cover rounded-lg shadow-lg"
        />
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{car.name}</h1>
          <p className="text-lg text-gray-600">Model: {car.carModel}</p>
        </div>
      </div>

      {/* Car Details Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="border rounded-lg p-6 shadow-md bg-white">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Car Specifications</h2>
          <ul className="space-y-2">
            <li><strong>Fuel Type:</strong> {car.fuelType}</li>
            <li><strong>Car Type:</strong> {car.carType}</li>
            <li><strong>KM:</strong> {car.km.toLocaleString()} km</li>
            <li><strong>Gear:</strong> {car.gear}</li>
          </ul>
        </div>

        <div className="border rounded-lg p-6 shadow-md bg-white">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Pricing & Availability</h2>
          <p><strong>Price:</strong> ${car.price} / day</p>
          <p><strong>Available Rentals:</strong> {car.rentals.length}</p>
        </div>
      </div>
    </div>
  );
};

export default SingleCarClient;