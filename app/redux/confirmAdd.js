import { createSlice } from "@reduxjs/toolkit"

export const confirmAddSlice = createSlice({
  name: "confirmAdd",
  initialState: {
    confirmAdd: true
  },
  reducers: {
    toggleConfirmAdd: (state) => {
      state.confirmAdd = !state.confirmAdd;
    },
    setConfirmAdd: (state, action) => {
      state.confirmAdd = action.payload
    }
  }
})

export const { toggleConfirmAdd, setConfirmAdd } = confirmAddSlice.actions;

export default confirmAddSlice.reducer;