import { createSlice } from "@reduxjs/toolkit"

export const cardCollectionSlice = createSlice({
  name: "cardCollection",
  initialState: {
    cardCollection: []
  },
  reducers: {
    setCardCollection: (state, action) => {
      state.cardCollection = action.payload
    },
  }
})

export const { setCardCollection } = cardCollectionSlice.actions;

export default cardCollectionSlice.reducer;