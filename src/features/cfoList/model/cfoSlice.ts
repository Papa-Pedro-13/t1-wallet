import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { instance } from '../../../app/ambient/axios.api';

import { CFO } from './types';

interface CFOState {
  list: CFO[];
  isLoading: boolean;
}

const initialState: CFOState = {
  list: [],
  isLoading: false,
};

// const mocks: CFO[] = [
//   { id: 1, title: 'asdasda', amount: 1200 },
//   { id: 2, title: 'GDGDF', amount: 200 },
// ];
export const getCFOList = createAsyncThunk(
  'CFO/getCFOList',
  async (_, thunkAPI) => {
    try {
      const res = await instance.get('/center/all');
      return res.data;
    } catch (err) {
      // toast.error('Что-то пошло не так. Обновите страницу');
      return thunkAPI.rejectWithValue(err);
    }
  }
);

const findCFOById = (state: CFOState, action: PayloadAction<number>) => {
  const res = state.list.find((element) => {
    if (element.id === action.payload) {
      return element;
    }
    return false;
  });
  if (res === undefined) {
    return;
  }
};

const CFOListSlice = createSlice({
  name: 'CFOList',
  initialState,
  reducers: {
    getCFOById: findCFOById,
  },
  extraReducers: (builder) => {
    builder.addCase(getCFOList.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getCFOList.rejected, (state) => {
      state.list = [];
      state.isLoading = false;
    });
    builder.addCase(getCFOList.fulfilled, (state, { payload }) => {
      if (payload !== undefined) {
        state.list = payload;
        state.isLoading = false;
      }
    });
  },
});
// export const { setCFOs } = CFOListSlice.actions;
export default CFOListSlice.reducer;
