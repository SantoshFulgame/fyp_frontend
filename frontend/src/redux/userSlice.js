import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: "",
  firstName: "",
  image: "",
  lastName: "",
  addressLine1: "",
  addressLine2: "",
  city: "",
  pincode: "",
  state: "",
  country: "",
  _id: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginRedux: (state, action) => {
      // console.log(action.payload.data);
      const userData = action.payload.data;
      state._id = userData._id;
      state.firstName = userData.firstName;
      state.lastName = userData.lastName;
      state.email = userData.email;
      state.image = userData.image;
      state.addressLine1 = userData.addressLine1;
      state.addressLine2 = userData.addressLine2;
      state.city = userData.city;
      state.pincode = userData.pincode;
      state.state = userData.state;
      state.country = userData.country;

      // Store user data in local storage
      localStorage.setItem("userData", JSON.stringify(userData));
    },
    logoutRedux: (state, action) => {
      state._id = "";
      state.firstName = "";
      state.lastName = "";
      state.email = "";
      state.addressLine1 = "";
      state.addressLine2 = "";
      state.city = "";
      state.pincode = "";
      state.state = "";
      state.country = "";
      state.image = "";

      // Clear user data from local storage
      localStorage.removeItem("userData");
    },
  },
});

export const { loginRedux, logoutRedux } = userSlice.actions;

export default userSlice.reducer;
