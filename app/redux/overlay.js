import { createSlice } from "@reduxjs/toolkit"

export const overlaySlice = createSlice({
  name: "overlay",
  initialState: {
    overlay: false
  },
  reducers: {
    toggleOverlay: (state) => {
      state.overlay = !state.overlay;
    },
    disableOverlay: (state) => {
      state.overlay = false;
    }
  }
})

export const { toggleOverlay, disableOverlay } = overlaySlice.actions;

export default overlaySlice.reducer;