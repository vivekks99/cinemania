import React from 'react'
import Banner from '../ui/Home/Banner'
import '../ui/Home/scrollcards.css';
import Slider from '../ui/Home/Slider';

function Home() {
  return (
    <div>
      <Banner />
      <Slider sliderType="popular" sliderTitle="Popular" />
      <Slider sliderType="top_rated" sliderTitle="Top Rated" />
    </div>
  )
}

export default Home