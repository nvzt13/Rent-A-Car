import { NextRequest } from 'next/server';
import * as RentalService from '../services/rentalService';
export const handlers = {
    GET: () => {
        return RentalService.getAllRentals();
    },
    POST: (req: NextRequest) => {
        return req.json().then((rentalData) => RentalService.createRental(rentalData));
    }
}