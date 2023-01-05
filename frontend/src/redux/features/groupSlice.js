import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as listAction from "../../utils/ListAction.js";
import axios from "axios";
import Configuration from "../../Configuration";

const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}

export const fetchGroups = createAsyncThunk("groups/fetchGroups", async () => {
  const response = await axios.get(Configuration.TODOLIST_URL + `/State`);
  await sleep(5000);
  const formattedData = listAction.formatDataForDisplay(response.data);
  console.log(formattedData);
  return [...formattedData];
});

const groupSlice = createSlice({
  name: "groups",
  initialState: {
    current: [],
    lastGroup: {},
    loading: false,
    error: "",
  },
  reducers: {
    addState(state, action) {},
  },
  extraReducers: {
    [fetchGroups.pending]: (state, action) => {
      state.loading = true;
    },
    [fetchGroups.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
    [fetchGroups.fulfilled]: (state, action) => {
      state.loading = false;
      state.current = [...action.payload];
    },
  },
});
const { reducer, actions } = groupSlice;
export const { addState } = actions;
export default reducer;
