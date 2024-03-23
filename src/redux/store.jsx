import { configureStore } from "@reduxjs/toolkit";
import ManageProductReducer from "./ManageProduct/ManageProduct";
export const store = configureStore({
  reducer: {
    productSystem: ManageProductReducer,
  },
});
