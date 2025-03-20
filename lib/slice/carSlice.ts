import { Car } from '@prisma/client';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

interface CarState {
  cars: Car[];
  loading: boolean;
}

const initialState: CarState = {
  cars: [],
  loading: false,
};

// Define the async thunk
export const fetchCars = createAsyncThunk('cars/fetchCars', async () => {
  try {
    const response = await fetch('/api/v1/car');
    if (response.ok) {
      const carsData = await response.json();
      return carsData.data;
    } else {
      alert('Arabalar yolda kaldı');
      return [];
    }
  } catch (error) {
    console.log(error);
    return [];
  }
});

const carSlice = createSlice({
  name: 'cars',
  initialState,
  reducers: {
    setCars: (state, action) => {
      state.cars = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCars.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCars.fulfilled, (state, action) => {
        state.cars = action.payload;
        state.loading = false;
      })
      .addCase(fetchCars.rejected, (state) => {
        state.loading = false;
        alert('Failed to fetch cars');
      });
  },
});

export const { setCars } = carSlice.actions;
export default carSlice.reducer;
/*
export const getAllProducts = createAsyncThunk("getAllProducts", async () => {
        const response = await axios.get(`${BASE_URL}/products`);
        return response.data;
})


const productSlice = createSlice({
        name: "product",
        initialState,
        reducers:{  
                setSelectedProduct: (state, action) => {
                        state.selectedProduct = action.payload
                        }
        },
        extraReducers: (builder) => {
                builder.addCase(getAllProducts.pending, (state) => {
                        state.loading = true;
                })
                builder.addCase(getAllProducts.fulfilled, (state, action) => {
                        state.products = action.payload
                        state.loading = false;

                })
        }
})
*/