import { combineReducers } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";

const rootReducer = combineReducers({
  home: userSlice.reducer,
});

export default rootReducer;
