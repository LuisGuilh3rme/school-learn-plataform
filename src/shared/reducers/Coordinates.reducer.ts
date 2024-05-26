import { createSlice } from "@reduxjs/toolkit";

const CoordinatesReducer = createSlice({
  name: "coordinates",
  initialState: {
    value: { x: 320, y: 50 },
  },
  reducers: {
    setCoordinate: (state, action) => {
      state.value = action.payload;
    },
    resetCoordinate: (state) => {
      state.value = { x: 320, y: 50 };
    },
  },
});

export const { setCoordinate, resetCoordinate } = CoordinatesReducer.actions;

export default CoordinatesReducer.reducer;
