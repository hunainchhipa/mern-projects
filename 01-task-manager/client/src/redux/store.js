import { configureStore } from "@reduxjs/toolkit";
import refreshReducer from "./refreshSlice";

const store = configureStore({
  reducer: {
    apiRefresh: refreshReducer,
  },
});

export default store;
