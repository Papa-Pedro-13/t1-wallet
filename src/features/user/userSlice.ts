import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LoginForm } from '../../pages/Login/Login';
import { BASE_URL } from '../../app/ambient/constants';
import axios from 'axios';

export enum UserRole {
  admin = 'ADMIN',
  user = 'USER',
  budgetOwner = 'BUDGET_OWNER',
}

interface User {
  id: number;
  email: string;
  firstname: string;
  lastname: string;
  surname: string;
  userRole: UserRole;
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
      const response = await axios.post(
        `${BASE_URL}/auth/signin`,
        {
          password: payload.password,
          email: payload.email,
        }
        // { headers: { 'Access-Control-Allow-Origin': '*' } }
      );
      localStorage.setItem('authToken', response.data.token);
      return response.data.user;
    } catch (err) {
      // console.log(err);
      return thunkAPI.rejectWithValue(err);
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.currentUser = { ...action.payload };
    },
    logoutUser: (state) => {
      localStorage.removeItem('authToken');
      delete axios.defaults.headers.common['Authorization'];
      state.currentUser = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.rejected, (state) => {
      state.currentUser = {
        id: 1,
        email: 'al@mail.ru',
        firstname: 'Александр',
        lastname: 'Островский',
        surname: 'Сергеевич',
        userRole: UserRole.admin,
        coins: 10000,
      };
    });
    builder.addCase(loginUser.fulfilled, (state, { payload }) => {
      state.currentUser = { ...payload };
    });
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
