import { createSlice } from "@reduxjs/toolkit"

export const confirmDeleteSlice = createSlice({
  name: "confirmDelete",
  initialState: {
    confirmDelete: true
  },
  reducers: {
    toggleConfirmDelete: (state) => {
      state.confirmDelete = !state.confirmDelete;
    },
    setConfirmDelete: (state, action) => {
      state.confirmDelete = action.payload
    }
  }
})

export const { toggleConfirmDelete, setConfirmDelete } = confirmDeleteSlice.actions;

export default confirmDeleteSlice.reducer;