import groupReducer from "./features/groupSlice";
import { configureStore } from "@reduxjs/toolkit";

const rootReducer = {groups: groupReducer};

export const store = configureStore({ reducer:  rootReducer});

export default store;
