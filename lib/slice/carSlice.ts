import { Car } from '@prisma/client';
import { createSlice } from '@reduxjs/toolkit';

interface CarState {
  cars: Car[];
}

const initialState: CarState = {
  cars: [],
};

const carSlice = createSlice({
  name: 'cars',
  initialState,
  reducers: {
    setCars: (state, action) => {
      state.cars = action.payload;
    },
  },
});

export const { setCars } = carSlice.actions;
export default carSlice.reducer;