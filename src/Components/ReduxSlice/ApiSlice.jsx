import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

let token = "beuwbvebvhbgyvyvtct121314";
export const submitSignUp = createAsyncThunk(
  "form/submitSignUp",
  async (formData, { dispatch, rejectWithValue }) => {
    try {
      dispatch(submitFormStart());
      const response = await axios.post(
        "http://localhost:5000/api/auth/signup",
        formData
      );
      dispatch(submitFormSuccess(response.data));
      console.log(response.data);
      return response.data;
    } catch (error) {
      dispatch(submitFormFailure(error.message));
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  isLoading: false,
  error: null,
  success: false,
  access_token: "",
  status: "",
};

const ApiSlice = createSlice({
  name: "form",
  initialState,

  reducers: {
    submitFormStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    submitFormSuccess: (state, action) => {
      // console.log(action);
      state.isLoading = false;
      state.success = true;
      state.access_token = action.payload.access_token;
      state.status = action.payload.success ? "success" : "failed";
    },
    submitFormFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const { submitFormStart, submitFormSuccess, submitFormFailure } =
  ApiSlice.actions;
export default ApiSlice.reducer;
