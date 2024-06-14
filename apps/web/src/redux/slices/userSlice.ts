import { Role, User } from '@/types/user.type';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { date } from 'zod';

const initialState: Omit<
  User,
  'createdAt' | 'isDelete' | 'employee' | 'address' | 'password'
> = {
  id: 0,
  fullName: '',
  email: '',
  role: Role.CUSTOMER,
  isVerify: false,
  profilePic: '',
  tokenExpiresIn: new Date(),
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginAction: (state, action: PayloadAction<User>) => {
      state.id = action.payload.id;
      state.fullName = action.payload.fullName;
      state.email = action.payload.email;
      state.role = action.payload.role;
      state.isVerify = action.payload.isVerify;
      state.profilePic = action.payload.profilePic;
      state.tokenExpiresIn = action.payload.tokenExpiresIn;
    },
    logoutAction: (state) => {
      state.id = 0;
      state.fullName = '';
      state.email = '';
      state.role = Role.CUSTOMER;
    },
  },
});

export const { loginAction, logoutAction } = userSlice.actions;

export default userSlice.reducer;
