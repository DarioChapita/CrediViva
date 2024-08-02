import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import API_URL from '../environment';


export const fetchCart = createAsyncThunk(
  'cart/fetchCart',
  async (_, { rejectWithValue }) => {
    try {
      const token = sessionStorage.getItem("token");
      const response = await axios.get(`${API_URL}/api/cart`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data.items;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addToCart = createAsyncThunk(
  'cart/addToCart',
  async ({ productId, quantity }, { dispatch, rejectWithValue }) => {
    try {
      const token = sessionStorage.getItem("token");
      if (!token) {
        throw new Error("Token not provided");
      }

      const response = await axios.post(`${API_URL}/api/cart/add`, { productId, quantity }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      dispatch(fetchCart());
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateCartItem = createAsyncThunk(
  'cart/updateCartItem',
  async ({ productSku, quantity }, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.put(`${API_URL}/api/cart/update`, { 
        productId: productSku,
        quantity: quantity,
      });
      
      if (response.status === 200) {
        await dispatch(fetchCart());
        return response.data;
      } else {
        return rejectWithValue('Error updating cart');
      }
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const checkout = createAsyncThunk(
  'cart/checkout',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      await axios.post(`${API_URL}/api/cart/checkout`);
      dispatch(fetchCart());
      dispatch(clearCart());
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    totalQuantity: 0,
    loading: false,
    error: null,
    completed: false,
  },
  reducers: {
    setCart: (state, action) => {
      state.items = action.payload;
      state.totalQuantity = action.payload.reduce((total, item) => total + item.quantity, 0);
    },
    clearCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
      state.completed = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload || [];
        state.totalQuantity = (action.payload || []).reduce((total, item) => total + (item.quantity || 0), 0);
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearCart } = cartSlice.actions;

export default cartSlice.reducer;