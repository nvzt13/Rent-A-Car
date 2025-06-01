import * as carService from "../services/carService";

export const handlers = {
  GET: (req: Request) => {
    return carService.getAllCars();
  },
  POST: async (req: Request) => {
    const formData = await req.formData();
    return carService.createCar(formData);
  },
 
};
