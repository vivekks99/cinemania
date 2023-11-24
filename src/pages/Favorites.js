import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { getSavedMovies, getSavedTvSeries } from '../features/favorites/favoritesSlice';
import Empty from '../features/favorites/Empty';
import FavoriteItem from '../features/favorites/FavoriteItem';
import SwitchTabs from '../components/SwitchTabs/SwitchTabs';

function Favorites() {
  const savedMovies = useSelector(getSavedMovies);
  const savedTvSeries = useSelector(getSavedTvSeries);
  const [currentTab, setCurrentTab] = useState("movie");

  return (
    <>
      <div className='favorites-container'>
        <SwitchTabs currentTab={currentTab} setCurrentTab={setCurrentTab} />
        {currentTab === "movie" ?
          <>
            {savedMovies.length !== 0 ?
              savedMovies.map(i => (
                <FavoriteItem key={i.id} item={i} />
              )) : <Empty />}
          </>
          :
          <>
            {savedTvSeries.length !== 0 ?
              savedTvSeries.map(i => (
                <FavoriteItem key={i.id} item={i} />
              )) : <Empty />}
          </>
        }
      </div>
    </>
  )
}

export default Favorites