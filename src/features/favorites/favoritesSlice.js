import { createSlice } from "@reduxjs/toolkit"

const movies = localStorage.getItem("savedMovies") !== null ? JSON.parse(localStorage.getItem("savedMovies")) : [];
const tvSeries = localStorage.getItem("savedTvSeries") !== null ? JSON.parse(localStorage.getItem("savedTvSeries")) : [];

const initialState = {
    savedMovies: movies,
    savedTvSeries: tvSeries
}

const favoritesSlice = createSlice({
    name: "favorites",
    initialState,
    reducers: {
        addFavoriteMovie(state, action){
            state.savedMovies.push(action.payload);
            localStorage.setItem("savedMovies", JSON.stringify(state.savedMovies.map(i => i)));
        },
        deleteFavoriteMovie(state, action){
            state.savedMovies = state.savedMovies.filter(i => i.id !== action.payload);
            localStorage.setItem("savedMovies", JSON.stringify(state.savedMovies.filter(i => i.id !== action.payload)));
        },
        addFavoriteTvSeries(state, action){
            state.savedTvSeries.push(action.payload);
            localStorage.setItem("savedTvSeries", JSON.stringify(state.savedTvSeries.map(i => i)));
        },
        deleteFavoriteTvSeries(state, action){
            state.savedTvSeries = state.savedTvSeries.filter(i => i.id !== action.payload);
            localStorage.setItem("savedTvSeries", JSON.stringify(state.savedTvSeries.filter(i => i.id !== action.payload)));
        }
    }
});

export const getSavedMovies = state => state.favorites.savedMovies;
export const getSavedTvSeries = state => state.favorites.savedTvSeries;

export const {addFavoriteMovie, addFavoriteTvSeries, deleteFavoriteMovie, deleteFavoriteTvSeries} = favoritesSlice.actions;

export default favoritesSlice.reducer;