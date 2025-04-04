import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Car } from "@prisma/client";

interface CarState {
  cars: Car[];
  loading: boolean;
}

const initialState: CarState = {
  cars: [],
  loading: false,
};

// Fetch cars
export const fetchCars = createAsyncThunk("cars/fetchCars", async () => {
  try {
    const response = await fetch("/api/v1/car");
    if (response.ok) {
      const carsData = await response.json();
      return carsData.data;
    } else {
      alert("Arabalar yolda kaldı");
      return [];
    }
  } catch (error) {
    console.log(error);
    return [];
  }
});

// Add a new car
export const addCar = createAsyncThunk("cars/addCar", async (carData: FormData, { dispatch }) => {
  try {
    const response = await fetch("/api/v1/car", {
      method: "POST",
      body: carData,
    });
    if (response.ok) {
      dispatch(fetchCars()); 
      const car = await response.json();
      alert("Car added successfully");
      return car;
    } else {
      alert("Failed to add car");
    }
  } catch (error) {
    console.error("Error:", error);
    alert("Error adding car");
  }
});

export const updateCar = createAsyncThunk(
  "cars/updateCar",
  async ({ carId, carData }: { carId: string; carData: FormData }, { dispatch }) => {
    try {
      const response = await fetch(`/api/v1/car/${carId}`, {
        method: "PUT",
        body: carData,
      });
      if (response.ok) {
        dispatch(fetchCars()); // Dispatch action to update the car in the store
        alert("Car updated successfully");
      } else {
        alert("Failed to update car");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error updating car");
    }
  }
);
const carSlice = createSlice({
  name: "cars",
  initialState,
  reducers: {
    setCars: (state, action) => {
      state.cars = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch cars
      .addCase(fetchCars.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCars.fulfilled, (state, action) => {
        state.cars = action.payload;
        state.loading = false;
      })
      .addCase(fetchCars.rejected, (state) => {
        state.loading = false;
        alert("Failed to fetch cars");
      })

      // Add car
      .addCase(addCar.fulfilled, (state, action) => {
        if (action.payload) {
          state.cars.push(action.payload);
        }
      })

      // Update car
      .addCase(updateCar.fulfilled, (state, action) => {
        if (action.payload) {
          const index = state.cars.findIndex((car) => car.id === action.payload.id);
          if (index !== -1) {
            state.cars[index] = action.payload;
          }
        }
      });
  },
});

export const { setCars } = carSlice.actions;
export default carSlice.reducer;
