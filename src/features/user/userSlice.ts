import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LoginForm } from '../../pages/Login/Login';
import { BASE_URL } from '../../app/ambient/constants';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
  coins: number;
}

interface UserState {
  currentUser: User | null;
}

const initialState: UserState = {
  currentUser: null,
};

export const loginUser = createAsyncThunk(
  'users/loginUser',
  async (payload: LoginForm, thunkAPI) => {
    try {
      const res = await fetch(`${BASE_URL}/auth/login`, {
        method: 'POST',
        body: JSON.stringify({
          password: payload.password,
          email: payload.email,
        }),
      });
      return res.json();
    } catch (err) {
      console.log(err);
      return thunkAPI.rejectWithValue(err);
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.currentUser = action.payload;
    },
    clearUser: (state) => {
      state.currentUser = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.currentUser = action.payload;
    });
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
