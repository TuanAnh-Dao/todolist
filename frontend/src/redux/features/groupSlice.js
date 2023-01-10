import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as listAction from "../../utils/ListAction.js";
import axios from "axios";
import Configuration from "../../Configuration";



export const fetchGroups = createAsyncThunk("groups/fetchGroups", async () => {
  const response = await axios.get(Configuration.TODOLIST_URL + `/State`);

  const formattedData = listAction.formatDataForDisplay(response.data);

  return [...formattedData];
});

export const saveDB = createAsyncThunk("groups/saveDB", async (data, thunkAPI) => {
  const response = await axios.put(Configuration.TODOLIST_URL + `/State`, data);

  const formattedData = await listAction.formatDataForDisplay(response.data);

  return [...formattedData];
});


const groupSlice = createSlice({
  name: "groups",
  initialState: {
    current: [],
    default: [],
    lastTask: {},
    isChanged: false,
    loading: false,
    error: "",
  },
  reducers: {
    updateState(state, action) {
      state.current = [...action.payload];
    },
    addNewTask(state, action) {
      state.current[0].taskList.push(action.payload);
    },
    setModified(state, action){
      state.isChanged = !action.payload
    },
    resetList(state,action){
      state.current = [...state.default]
    }
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
      state.default = [...action.payload];
    },
    [saveDB.pending]: (state, action) => {
      state.loading = true;
    },
    [saveDB.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
    [saveDB.fulfilled]: (state, action) => {
      state.loading = false;
      state.current = [...action.payload];
      state.default = [...action.payload];
    },
  },
});
const { reducer, actions } = groupSlice;
export const { updateState, addNewTask, setModified, resetList } = actions;
export default reducer;
