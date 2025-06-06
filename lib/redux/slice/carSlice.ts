import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Car } from "@prisma/client";
import { CarState } from "@/type/types";


// Initial state
const initialState: CarState = {
  cars: [],
  // hydrasyon hatasina yol acmamasi icin true
  loading: true,
};

// Fetch cars
export const fetchCars = createAsyncThunk("cars/fetchCars", async () => {
  try {
    const response = await fetch("/api/v2/cars");
    if (response.ok) {
      const carsData = await response.json();
      return carsData.data; // Dönen veri carsData.data
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
export const addCar = createAsyncThunk<Car | void, FormData>(
  "cars/addCar",
  async (carData: FormData, { dispatch }) => {
    try {
      const response = await fetch("/api/v2/cars", {
        method: "POST",
        body: carData,
      });
      if (response.ok) {
        const car = await response.json();
        dispatch(fetchCars());
        alert("Car added successfully");
        return car; // Dönen araba verisi
      } else {
        alert("Failed to add car");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error adding car");
    }
  }
);
// Toggle car status
export const toggleCarAvailability = createAsyncThunk<
  Car,
  { carId: string }
>("cars/toggleCarAvailability", async ({ carId }) => {
  const response = await fetch(`/api/v2/cars/${carId}`, {
    method: "PATCH",
  });

  if (!response.ok) {
    throw new Error("Failed to toggle car availability");
  }

  const updatedCar = await response.json();
  return updatedCar;
});


// Update car
export const updateCar = createAsyncThunk<
  Car,
  { carId: string; carData: FormData }
>("cars/updateCar", async ({ carId, carData }, { dispatch }) => {
  const response = await fetch(`/api/v2/cars/${carId}`, {
    method: "PUT",
    body: carData,
  });
  if (!response.ok) {
    alert("Failed to update car");
    throw new Error("Failed to update car");
  }
  dispatch(fetchCars());
  alert("Car updated successfully");
  return await response.json();
});

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
        const index = state.cars.findIndex(
          (car) => car.id === action.payload.id
        );
        if (index !== -1) {
          state.cars[index] = action.payload;
        }
      })
      // Toggle car status
      .addCase(toggleCarAvailability.fulfilled, (state, action) => {
        const index = state.cars.findIndex((car) => car.id === action.payload.id);
        if (index !== -1) {
          state.cars[index] = action.payload;
        }
      })
      
  },
});

export const { setCars } = carSlice.actions;
export default carSlice.reducer;
