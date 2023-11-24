import React from 'react'
import './search.css'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getSearchItem, setSearchItem, setShowSearch } from './searchSlice';

function SearchBar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const searchItem = useSelector(getSearchItem)

  function handleSearchSubmit(e){
    e.preventDefault();
    dispatch(setShowSearch(false));
    navigate(`/search-results?query=${searchItem}`);
  }

  return (
    <form className="searchInput" onSubmit={handleSearchSubmit}>
        <input type="text" placeholder="Search for a movie or tv show...." value={searchItem} onChange={e => dispatch(setSearchItem(e.target.value))} />
        <button type='submit'>Search</button>
    </form>
  )
}

export default SearchBar