import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Rental } from '@prisma/client';

interface RentalState {
  rentals: Rental[];
  loadingRental: boolean;
}
const initialState: RentalState = {
  rentals: [],
  loadingRental: false,
};

export const fetchRentals = createAsyncThunk('rentals/fetchRentals', async () => {
  try {
    const response = await fetch('/api/v1/rental');
    if (response.ok) {
      const rentalsData = await response.json();
      console.log(response)
      console.log(rentalsData.allRentals)
      return rentalsData.allRentals;
    } else {
      alert('Randevular yolda kaldı');
      return [];
    }
  } catch (error) {
    console.log(error);
    return [];
  }
});

const rentalSlice = createSlice({
  name:'rentals',
  initialState,
  reducers: {
    setRentals: (state, action) => {
      state.rentals = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRentals.pending, (state) => {
        state.loadingRental = true;
      })
      .addCase(fetchRentals.fulfilled, (state, action) => {
        state.rentals = action.payload;
        state.loadingRental = false;
      })
      .addCase(fetchRentals.rejected, (state) => {
        state.loadingRental = false;
        alert('Failed to fetch rentals');
      });
  },
})

export const { setRentals } = rentalSlice.actions;
export default rentalSlice.reducer;