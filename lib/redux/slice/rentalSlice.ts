import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RentalState } from '@/type/types';


const initialState: RentalState = {
  rentals: [],
  loadingRental: true,
};

// Rentals Fetch Async Thunk
export const fetchRentals = createAsyncThunk('rentals/fetchRentals', async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch('/api/v2/rental', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
    if (response.ok) {
      const rentalsData = await response.json();
      return rentalsData.data;
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
  async ( id : number, { dispatch }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/v2/rental/${id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const updatedRental = await response.json();
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

// Rental Delete Async Thunk
export const deleteRental = createAsyncThunk(
  'rentals/deleteRental',
  async (id: number, { dispatch }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/v2/rental/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        // Silinen rental sonrasında güncel rental listesini çekelim
        dispatch(fetchRentals());
        return id; // Silinen rental'ın id'sini döndürelim
      } else {
        alert('Randevu silinemedi');
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
      })
      // Delete Rental
      .addCase(deleteRental.pending, (state) => {
        state.loadingRental = true;
      })
      .addCase(deleteRental.fulfilled, (state, action) => {
        if (action.payload) {
          state.rentals = state.rentals.filter((rental) => rental.id !== action.payload);
        }
        state.loadingRental = false;
      })
      .addCase(deleteRental.rejected, (state) => {
        state.loadingRental = false;
        alert('Failed to delete rental');
      });
  },
});

export const { setRentals } = rentalSlice.actions;
export default rentalSlice.reducer;
