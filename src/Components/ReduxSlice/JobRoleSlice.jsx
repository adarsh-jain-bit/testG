import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const JobData = createAsyncThunk(
  "form/jobRoleData",
  async (data, { dispatch, rejectWithValue }) => {
    try {
      dispatch(Start());
      const response = await axios.get(
        `https://testifybackend.onrender.com/api/data/jobRolesData/${data}`
      );
      dispatch(Success(response.data));
      console.log("data of job role", response.data);
      return response.data;
    } catch (error) {
      dispatch(Failure(error.message));
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  isLoading: false,
  error: null,
  success: false,
  JobRoleData: [],
};

const JobRole = createSlice({
  name: "jobRole",
  initialState,
  reducers: {
    Start: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    Success: (state, action) => {
      //   console.log(action);
      state.isLoading = false;
      state.success = true;
      state.JobRoleData = action.payload;
    },
    Failure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const { Start, Success, Failure } = JobRole.actions;
export default JobRole.reducer;
