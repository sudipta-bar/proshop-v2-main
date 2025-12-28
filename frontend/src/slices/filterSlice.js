import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  category: '',
  minPrice: 0,
  maxPrice: 100000,
  rating: '',
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    setMinPrice: (state, action) => {
      const value = Number(action.payload);
      state.minPrice = isNaN(value) || value < 0 ? 0 : value;
    },
    setMaxPrice: (state, action) => {
      const value = Number(action.payload);
      state.maxPrice = isNaN(value) || value < 0 ? 100000 : value;
    },
    setRating: (state, action) => {
      state.rating = action.payload;
    },
    clearFilters: (state) => {
      state.category = '';
      state.minPrice = 0;
      state.maxPrice = 100000;
      state.rating = '';
    },
  },
});

export const { setCategory, setMinPrice, setMaxPrice, setRating, clearFilters } = filterSlice.actions;

export default filterSlice.reducer;