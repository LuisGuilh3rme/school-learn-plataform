import { createSlice } from "@reduxjs/toolkit";
import { Dimensions } from "react-native";

const { width } = Dimensions.get("window");

const iconWidth = 40;
const iconMargin = 0.1 * width;

const initialXCoordinate = width - iconWidth - iconMargin;
const initialYCoordinate = 50;

const CoordinatesReducer = createSlice({
  name: "coordinates",
  initialState: {
    value: { x: initialXCoordinate, y: initialYCoordinate },
  },
  reducers: {
    setCoordinate: (state, action) => {
      const x = action.payload.x - iconWidth;
      const y = action.payload.y - initialYCoordinate;
      state.value = { x, y };
    },
    resetCoordinate: (state) => {
      state.value = { x: initialXCoordinate, y: initialYCoordinate };
    },
  },
});

export const { setCoordinate, resetCoordinate } = CoordinatesReducer.actions;

export default CoordinatesReducer.reducer;
