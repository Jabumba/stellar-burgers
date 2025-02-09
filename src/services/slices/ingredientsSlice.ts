import { getIngredientsApi } from '@api';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';

export const fetchIngredients = createAsyncThunk(
    'burger/getIngredients',
    getIngredientsApi
);

interface IngredientsListState {
  ingredients: TIngredient[];
  isLoading: boolean;
  isContain: boolean;
}

const initialState: IngredientsListState = {
  ingredients: [],
  isLoading: false,
  isContain: false
};

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.isLoading = false;
        state.ingredients = action.payload;
        state.isContain = true;
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.isLoading = false;
        console.log(action)
        state.isContain = false;
      })
  },
  selectors: {
    getIngredients: (state) => state.ingredients,
    getContainStatus: (state) => state.isContain,
    getLoadingStatus: (state) => state.isLoading
  }
});

export const { getIngredients, getContainStatus, getLoadingStatus } =
  ingredientsSlice.selectors;
export { ingredientsSlice };