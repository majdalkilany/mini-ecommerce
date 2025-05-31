import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../../app/store';

const baseURL = import.meta.env.VITE_API_URL;

export interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
}

interface ProductState {
  products: Product[];
  loading: boolean;
  error: string | null;
}

const initialState: ProductState = {
  products: [],
  loading: false,
  error: null,
};

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as RootState;
      const token = state.auth.token;

      const res = await axios.get(`${baseURL}/products`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      return res.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to fetch products');
    }
  }
);

export const createProduct = createAsyncThunk(
  'products/createProduct',
  async (productData: { name: string; price: number; stock: number }, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as RootState;
      const token = state.auth.token;

      const res = await axios.post(`${baseURL}/products`, productData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      return res.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || 'Product creation failed');
    }
  }
);

export const updateProduct = createAsyncThunk(
  'products/updateProduct',
  async (params: { id: string; data: Partial<Product> }, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as RootState;
      const token = state.auth.token;

      const res = await axios.put(`${baseURL}/products/${params.id}`, params.data, {
        headers: { Authorization: `Bearer ${token}` },
      });

      return res.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || 'Update failed');
    }
  }
);

export const deleteProduct = createAsyncThunk(
  'products/deleteProduct',
  async (id: string, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as RootState;
      const token = state.auth.token;

      await axios.delete(`${baseURL}/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      return id;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || 'Delete failed');
    }
  }
);

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
        state.products = action.payload;
        state.loading = false;
      })
      .addCase(fetchProducts.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createProduct.fulfilled, (state, action: PayloadAction<Product>) => {
        state.products.push(action.payload);
      })
      .addCase(updateProduct.fulfilled, (state, action: PayloadAction<Product>) => {
        const i = state.products.findIndex((p) => p.id === action.payload.id);
        if (i !== -1) state.products[i] = action.payload;
      })
      .addCase(deleteProduct.fulfilled, (state, action: PayloadAction<string>) => {
        state.products = state.products.filter((p) => p.id !== action.payload);
      });
  },
});

export default productSlice.reducer;
