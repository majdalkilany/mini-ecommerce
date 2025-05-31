import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../../app/store';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'ADMIN' | 'CUSTOMER';
}

interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  token: localStorage.getItem('token'),
  loading: false,
  error: null,
};

const baseURL = import.meta.env.VITE_API_URL;

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (userData: { name: string; email: string; password: string }, thunkAPI) => {
    try {
      const res = await axios.post(`${baseURL}/auth/register`, userData);
      localStorage.setItem('token', res.data.access_token);
      return res.data.access_token;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || 'Registration failed');
    }
  }
);

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials: { email: string; password: string }, thunkAPI) => {
    try {
      const res = await axios.post(`${baseURL}/auth/login`, credentials);
      localStorage.setItem('token', res.data.access_token);
      return res.data.access_token;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || 'Login failed');
    }
  }
);

export const fetchCurrentUser = createAsyncThunk(
  'auth/fetchCurrentUser',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    const token = state.auth.token;

    try {
      const res = await axios.get(`${baseURL}/users/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || 'Fetch failed');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem('token');
    },
  },
extraReducers: (builder) => {
  builder.addCase(
    fetchCurrentUser.fulfilled,
    (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    }
  );

  builder
    .addMatcher(
      (action): boolean =>
        [registerUser.pending.type, loginUser.pending.type].includes(action.type),
      (state) => {
        state.loading = true;
        state.error = null;
      }
    )
    .addMatcher(
      (action): action is PayloadAction<string> =>
        [registerUser.fulfilled.type, loginUser.fulfilled.type].includes(action.type),
      (state, action) => {
        state.token = action.payload;
        state.loading = false;
      }
    )
    .addMatcher(
      (action): boolean =>
        [registerUser.rejected.type, loginUser.rejected.type].includes(action.type),
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      }
    );
  }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
