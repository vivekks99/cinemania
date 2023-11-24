import React, { useState } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import './navbar.css';
import { useDispatch } from 'react-redux';
import { setShowSearch } from '../../features/search/searchSlice';

function Navbar() {
  const [showMenu, setShowMenu] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const location = useLocation();

  function handleNavigate(type){
    setShowMenu(i => !i);
    if(type === 'movie'){
        navigate('/explore/movie');
    }
    else if(type === 'tv'){
        navigate('/explore/tv');
    }
    else{
        navigate('/favorites');
    }
  }

  return (
    <>
        <div className={showMenu ? 'navbar navbar-active' : 'navbar'}>
            <div className="logo">
                <NavLink to="/"><img src="/home-logo.jpg" alt="" /></NavLink>
            </div>
            <div className='flex'>
                <ul className={showMenu ? 'nav-menu active' : 'nav-menu'}>
                    <li className="links hover" onClick={() => handleNavigate("movie")}>Movies</li>
                    <li className="links hover" onClick={() => handleNavigate("tv")}>TV-Series</li>
                    <li className="links hover" onClick={() => handleNavigate("favorite")}>Favorites</li>
                </ul>
                {!(location.pathname === '/') && <div className="search-icon hover" onClick={() => dispatch(setShowSearch(true))}>
                    <i className="fas fa-search"></i>
                </div>}
                <div className="menu-icon hover" onClick={() => setShowMenu(i => !i)}>
                    <i className={ showMenu ? 'fas fa-times' : 'fas fa-bars' } />
                </div>
            </div>
        </div>
    </>
  )
}

export default Navbar