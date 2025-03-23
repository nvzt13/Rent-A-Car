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

// Rentals Fetch Async Thunk
export const fetchRentals = createAsyncThunk('rentals/fetchRentals', async () => {
  try {
    const response = await fetch('/api/v1/rental');
    if (response.ok) {
      const rentalsData = await response.json();
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

// Rental Update Async Thunk
export const updateRental = createAsyncThunk(
  'rentals/updateRental',
  async ({ id, status }: { id: number, status: string }, { dispatch, getState }) => {
    try {
      const response = await fetch(`/api/v1/rental/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });

      if (response.ok) {
        const updatedRental = await response.json();

        // Fetch updated rentals from the server
        dispatch(fetchRentals());

        return updatedRental;
      } else {
        alert('Randevu güncellenemedi');
        return null;
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  }
);

const rentalSlice = createSlice({
  name: 'rentals',
  initialState,
  reducers: {
    setRentals: (state, action) => {
      state.rentals = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Rentals
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
      })
      // Update Rental
      .addCase(updateRental.pending, (state) => {
        state.loadingRental = true;
      })
      .addCase(updateRental.fulfilled, (state, action) => {
        if (action.payload) {
          const index = state.rentals.findIndex((rental) => rental.id === action.payload.id);
          if (index !== -1) {
            state.rentals[index] = action.payload;
          }
        }
        state.loadingRental = false;
      })
      .addCase(updateRental.rejected, (state) => {
        state.loadingRental = false;
        alert('Failed to update rental');
      });
  },
});

export const { setRentals } = rentalSlice.actions;
export default rentalSlice.reducer;
