import * as RentalService from '../services/rentalService';
export const handlers = {
    GET: (req: Request) => {
        return RentalService.getAllRentals();
    },
    POST: (req: Request) => {
        return req.json().then((rentalData) => RentalService.createRental(rentalData));
    }
}