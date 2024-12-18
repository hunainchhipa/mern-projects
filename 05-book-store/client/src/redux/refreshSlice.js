import { createSlice } from "@reduxjs/toolkit";

const refreshSlice = createSlice({
  name: "apiRefresh",
  initialState: {
    refresh: false,
  },
  reducers: {
    triggerRefresh: (state) => {
      state.refresh = !state.refresh;
    },
  },
});

export const { triggerRefresh } = refreshSlice.actions;
export default refreshSlice.reducer;
