import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface AvatarState {
  value: string | null;
}

const initialState: AvatarState = {
  value: null,
};

const AvatarReducer = createSlice({
  name: "avatar",
  initialState,
  reducers: {
    setAvatar: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
});

export const { setAvatar } = AvatarReducer.actions;

export default AvatarReducer.reducer;
