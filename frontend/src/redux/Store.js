import groupReducer from "./features/groupSlice";
import { configureStore } from "@reduxjs/toolkit";
import devToolsEnhancer from 'remote-redux-devtools';

const rootReducer = { groups: groupReducer };

export const store = configureStore({
  reducer: rootReducer,
  devTools: false,
  enhancers: [devToolsEnhancer({ name: "Simple Redux",realtime: true, port: 8000 })],
});

export default store;
