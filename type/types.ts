export interface CreateCar {
  name:      string;
  carModel:  string;
  fuelType:  string;
  carType:   string;
  km:        number | string;
  price:     number | string;
  status?:   string;
  startDate?: Date;  
  endDate?:   Date;  
  image:     string;
}
