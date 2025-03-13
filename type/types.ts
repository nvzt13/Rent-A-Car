export interface CreateCar {
  name:      String;
  carModel:  String;
  fuelType:  String;
  carType:   String;
  km:        Int;
  price:     Int;
  status:    String?;
  startDate: DateTime?;
  endDate:   DateTime?;
  image:     String;
}