import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Explore from './pages/Explore'
import Error from './pages/Error'
import Favorites from './pages/Favorites'
import MainLayout from './pages/MainLayout'
import Selected from './ui/Selected/Selected'
import SearchResults from './pages/SearchResults'
import SeeMore from './pages/SeeMore'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path='/explore/:mediaType' element={<Explore />} />
          <Route path='/explore/:mediaType/:id' element={<Selected />} />
          <Route path='/favorites' element={<Favorites />} />
          <Route path='/favorites/:id' element={<Selected />} />
          <Route path='/search-results' element={<SearchResults />} />
          <Route path='/search-results/:id' element={<Selected />} />
          <Route path='/see-more/:mediaType' element={<SeeMore />} />
          <Route path='/see-more/:mediaType/:id' element={<Selected />} />
          <Route path='*' element={<Error />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App