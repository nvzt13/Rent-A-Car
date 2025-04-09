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