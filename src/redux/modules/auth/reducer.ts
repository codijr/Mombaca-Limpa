import { createSlice } from "@reduxjs/toolkit";
import { User } from "../../../@types";

export const initialState: User = {
  userId: "",
  name: "",
  email: "",
  password: "",
  avatar: "",
  role: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLogin: (state, { payload }) => {
      return {
        ...state,
        userId: payload.userId,
        name: payload.name,
        email: payload.email,
        password: payload.password,
        avatar: payload.avatar,
        role: payload.role,
      };
    },
  },
});

export const { setLogin } = authSlice.actions;

export default authSlice.reducer;
