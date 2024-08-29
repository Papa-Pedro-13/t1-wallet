import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { LoginForm } from '../../../pages/Login/Login';
import {
  removeTokenFromLocalStorage,
  setTokenLocalStorage,
} from '../../../shared/lib/storage';
import { instance } from '../../../app/ambient/axios.api';
import { User } from './types/user';

interface UserState {
  currentUser: User | null;
  usersList: User[];
  isLoading: boolean;
}

const initialState: UserState = {
  currentUser: null,
  usersList: [],
  isLoading: false,
};

export const getAllUsers = createAsyncThunk(
  'users/getAllUsers',
  async (_, thunkAPI) => {
    try {
      const { data } = await instance.get('/user/all');

      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);
export const loginUser = createAsyncThunk(
  'users/loginUser',
  async (payload: LoginForm, thunkAPI) => {
    try {
      const response = await instance.post(
        '/auth/signin',
        {
          password: payload.password,
          email: payload.email,
        }
        // { headers: { 'Access-Control-Allow-Origin': '*' } }
      );

      return response.data;
    } catch (err) {
      // console.log(err);
      return thunkAPI.rejectWithValue(err);
    }
  }
);
export const getUser = createAsyncThunk(
  'users/getUser',
  async (_, thunkAPI) => {
    try {
      const { data } = await instance.get('/user/');

      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // setUser: (state, action: PayloadAction<User>) => {
    //   state.currentUser = { ...action.payload };
    // },
    logoutUser: (state) => {
      removeTokenFromLocalStorage('authToken');
      state.currentUser = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getUser.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(loginUser.rejected, (state) => {
      setTokenLocalStorage('authToken', '123243433ddfffvddvf');
      // state.currentUser = {
      //   id: 1,
      //   email: 'al@mail.ru',
      //   firstname: 'Александр',
      //   lastname: 'Островский',
      //   surname: 'Сергеевич',
      //   userRole: UserRole.admin,
      //   coins: 10000,
      // };
      state.currentUser = null;
      state.isLoading = false;
    });
    builder.addCase(getUser.rejected, (state) => {
      removeTokenFromLocalStorage('authToken');
      state.currentUser = null;
      state.isLoading = false;
    });
    builder.addCase(getAllUsers.rejected, (state) => {
      state.usersList = [];
      // state.usersList = [
      //   {
      //     id: 1,
      //     email: 'al@mail.ru',
      //     firstname: 'Александр',
      //     lastname: 'Островский',
      //     surname: 'Сергеевич',
      //     userRole: UserRole.admin,
      //     coins: 10000,
      //   },
      //   {
      //     id: 12,
      //     email: 'al@mail.ru',
      //     firstname: 'ad',
      //     lastname: 'Осфровский',
      //     surname: 'Сеевич',
      //     userRole: UserRole.budgetOwner,
      //     coins: 10000,
      //   },
      //   {
      //     id: 11,
      //     email: 'al@mail.ru',
      //     firstname: 'Алекндр',
      //     lastname: 'тровский',
      //     surname: 'геевич',
      //     userRole: UserRole.budgetOwner,
      //     coins: 10000,
      //   },
      //   {
      //     id: 167,
      //     email: 'al@mail.ru',
      //     firstname: 'Алеандр',
      //     lastname: 'Острский',
      //     surname: 'Сергевич',
      //     userRole: UserRole.budgetOwner,
      //     coins: 10000,
      //   },
      //   {
      //     id: 12,
      //     email: 'al@mail.ru',
      //     firstname: 'Александры',
      //     lastname: 'Островы',
      //     surname: 'Сергеы',
      //     userRole: UserRole.budgetOwner,
      //     coins: 10000,
      //   },
      //   {
      //     id: 10,
      //     email: 'al@mail.ru',
      //     firstname: 'Алфыксандр',
      //     lastname: 'Остркий',
      //     surname: 'Сергеевыич',
      //     userRole: UserRole.admin,
      //     coins: 10000,
      //   },
      // ];
    });
    builder.addCase(getUser.fulfilled, (state, { payload }) => {
      state.currentUser = { ...payload };
      state.isLoading = false;
    });
    builder.addCase(getAllUsers.fulfilled, (state, { payload }) => {
      state.usersList = payload;
    });
    builder.addCase(loginUser.fulfilled, (state, { payload }) => {
      setTokenLocalStorage('authToken', payload.token);
      state.currentUser = { ...payload.user };
      state.isLoading = false;
    });
  },
});

export const { logoutUser } = userSlice.actions;
export default userSlice.reducer;
