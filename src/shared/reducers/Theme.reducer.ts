import { createSlice } from "@reduxjs/toolkit";

const ThemeReducer = createSlice({
  name: "theme",
  initialState: {
    value: false,
  },
  reducers: {
    toggle: (state) => {
      state.value = !state.value;
    },
  },
});

export const { toggle } = ThemeReducer.actions;

export default ThemeReducer.reducer;
