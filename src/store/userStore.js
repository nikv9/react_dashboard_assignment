import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
  },
  reducers: {
    getUser: (state, payload) => {
      console.log(payload);
      state.user = payload;
    },
  },
});

export const { getUser } = userSlice.actions;

export default userSlice.reducer;
