import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API_ENDPOINT = "http://23.22.32.42/api";

export const signupUser = createAsyncThunk(
  "userAuth/loginUser",
  async (userData, thunkAPI) => {
    try {
      const response = await axios.post(`${API_ENDPOINT}/signup`, userData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = response.data;
      console.log("data", data);

      return data;
    } catch (error) {
      console.error("Error:", error.response.data);
      return thunkAPI.rejectWithValue({ error: error.response.data });
    }
  }
);
export const loginUser = createAsyncThunk(
    "userAuth/loginUser",
    async (userData, thunkAPI) => {
      try {
        const response = await axios.post(`${API_ENDPOINT}/signin`, userData, {
          headers: {
            "Content-Type": "application/json",
          },
        });
  
        const data = response.data;
        console.log("data", data);
  
        return data;
      } catch (error) {
        console.error("Error:", error.response.data);
        return thunkAPI.rejectWithValue({ error: error.response.data });
      }
    }
  );
const userFromStorage = JSON.parse(localStorage.getItem("user")) || null;

const userAuthSlice = createSlice({
  name: "userAuth",
  initialState: {
    user: userFromStorage,
    loading: "idle",
    data: null,
    errors: null,
    token: null,
  },
  reducers: {
    logoutUser: (state) => {
      state.user = null;
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = "pending";
        state.errors = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = "fulfilled";
        state.data = action.payload;
        state.token = action.payload.token;
        state.user = action.payload.user;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = "rejected";
        state.errors = action.payload;
      });
  },
});

export const { logoutUser } = userAuthSlice.actions;

export default userAuthSlice.reducer;
