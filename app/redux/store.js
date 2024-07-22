import { configureStore } from "@reduxjs/toolkit"
import darkModeReducer from "./darkMode"
import overlayReducer from "./overlay"
import cardCollectionReducer from "./cardCollection"
import confirmAddReducer from "./confirmAdd"
import confirmDeleteReducer from "./confirmDelete"

export default configureStore({
  reducer: {
    darkMode: darkModeReducer,
    overlay: overlayReducer,
    cardCollection: cardCollectionReducer,
    confirmAdd: confirmAddReducer,
    confirmDelete: confirmDeleteReducer
  }
})