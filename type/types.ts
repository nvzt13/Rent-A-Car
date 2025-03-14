export interface CreateCar {
  name:      string;
  carModel:  string;
  fuelType:  string;
  carType:   string;
  km:        number | null;
  price:     number | null;
  status?:   string;
  startDate?: Date;  
  endDate?:   Date;  
  image:     string;
}
