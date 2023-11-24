import { configureStore } from "@reduxjs/toolkit";
import favoritesSlice from "./features/favorites/favoritesSlice";
import searchSlice from "./features/search/searchSlice";

const store = configureStore({
    reducer: {
        favorites: favoritesSlice,
        search: searchSlice
    }
})

export default store;