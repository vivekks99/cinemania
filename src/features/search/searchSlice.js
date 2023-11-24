import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    searchItem: '',
    showSearch: false
}

const searchSlice = createSlice({
    name: "search",
    initialState,
    reducers: {
        setSearchItem(state, action){
            state.searchItem = action.payload;
        },
        setShowSearch(state, action){
            state.showSearch = action.payload
        }
    }
});

export const getSearchItem = state => state.search.searchItem;
export const getShowSearch = state => state.search.showSearch;

export const {setSearchItem, setShowSearch} = searchSlice.actions;

export default searchSlice.reducer;