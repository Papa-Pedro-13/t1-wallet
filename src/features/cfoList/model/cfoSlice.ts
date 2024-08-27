import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { BASE_URL } from '../../../app/ambient/constants';
import toast from 'react-hot-toast';

interface CFO {
  id: string;
  title: string;
  amount: string;
}

interface CFOState {
  list: CFO[] | null;
  isLoading: boolean;
}

const initialState: CFOState = {
  list: [],
  isLoading: false,
};

export const getCFOList = createAsyncThunk('CFO/getCFOList', async () => {
  try {
    const res = await fetch(`${BASE_URL}/get-all-centers/`);
    return res.json();
  } catch (err) {
    toast.error('Что-то пошло не так. Обновите страницу');
  }
});

const CFOListSlice = createSlice({
  name: 'CFOList',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCFOList.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getCFOList.fulfilled, (state, action) => {
      state.list = action.payload;
      state.isLoading = false;
    });
  },
});
// export const { , clearUser } = CFOListSlice.actions;
export default CFOListSlice.reducer;
