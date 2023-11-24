import React from 'react'
import './overlay.css'
import SearchBar from '../../features/search/SearchBar'
import { useDispatch } from 'react-redux'
import { setShowSearch } from '../../features/search/searchSlice';

function Overlay() {
  const dispatch = useDispatch();
  return (
    <div className="overlay">
        <div className="overlay__background" />
        <div className="overlay__container d-center">
            <div className="overlay__controls">
                <div className="overlay-cross hover" onClick={() => dispatch(setShowSearch(false))}>
                    <i className='fas fa-times' />
                </div>
                <SearchBar />
            </div>
        </div>
    </div>
  )
}

export default Overlay