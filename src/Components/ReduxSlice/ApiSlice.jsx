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
        "https://testifybackend.onrender.com/api/auth/signup",
        formData
      );
      dispatch(submitFormSuccess(response.data));
      console.log(response.data);
      return response.data;
    } catch (error) {
      // console.log(error);
      dispatch(submitFormFailure(error?.response?.data));
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
    resetForm: (state, action) => {
      localStorage.clear();
      state.access_token = "";
      state.status = "";
    },
  },
});

export const {
  submitFormStart,
  submitFormSuccess,
  submitFormFailure,
  resetForm,
} = ApiSlice.actions;
export default ApiSlice.reducer;
