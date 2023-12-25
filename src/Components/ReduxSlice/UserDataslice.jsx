import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  isLoading: false,
  error: null,
  success: false,
  formData: {},
};

export const userData = createAsyncThunk(
  "auth/userdata",
  async (usertoken, { dispatch, rejectWithValue }) => {
    try {
      dispatch(userDataStart());
      const response = await axios.get(
        "https://testifybackend.onrender.com/api/auth/getuser",
        {
          headers: {
            authToken: usertoken,
          },
        }
      );
      dispatch(userDataSuccess(response.data));
      return response.data;
    } catch (error) {
      console.log(error);
      dispatch(userDataFailure(error.message));
      return rejectWithValue(error.message);
    }
  }
);
const getData = createSlice({
  name: "userData",
  initialState,
  reducers: {
    userDataStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    userDataSuccess: (state, action) => {
      state.isLoading = false;
      state.success = true;
      state.formData = action.payload;
    },
    userDataFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});
export const { userDataStart, userDataSuccess, userDataFailure } =
  getData.actions;
export default getData.reducer;
