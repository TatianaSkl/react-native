import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    userId: null,
    nickname: null,
  },
  reducers: {},
});

export const authReducer = authSlice.reducer;
