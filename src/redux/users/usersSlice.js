import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getUsers = createAsyncThunk(
  "users/getUsers",
  async (arg, { rejectWithValue }) => {
    try {
      const response = await axios.get("https://randomuser.me/api/?results=5");
      return response.data;
    } catch (error) {
      rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  usersList: [],
  isLoading: false,
  error: null,
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(getUsers.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(getUsers.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.usersList = action.payload.results; // assign the user data array to usersList
    })
    .addCase(getUsers.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default usersSlice.reducer;
export const { extraReducers } = usersSlice.actions;
