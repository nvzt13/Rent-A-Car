import { NextRequest } from "next/server";
import * as carService from "../services/carService";

export const handlers = {
  GET: () => {
    return carService.getAllCars();
  },
  POST: async (req: NextRequest) => {
    const formData = await req.formData();
    return carService.createCar(formData);
  },

 }
