import { Car, Rental } from "@prisma/client";

export interface CreateCar {
  name:      string;
  carModel:  string;
  fuelType:  string;
  carType:   string;
  km:        number | string;
  price:     number | string;
  gear?:   string;
  startDate?: Date;  
  endDate?:   Date;  
  image:     string;
}
export interface MonthlyReport {
  month: string;
  year: number;
  totalIncome: number;
  totalRentals: number;
}

// State type
export interface CarState {
  cars: Car[];
  loading: boolean;
}

export interface RentalState {
  rentals: Rental[];
  loadingRental: boolean;
}

export interface RentalCreateType {
  customerName: string;
  phoneNumber: string;
  takeHour?: string | null;
  rentalDate: Date | string;
  returnDate: Date | string;
  carId: number | string;
}