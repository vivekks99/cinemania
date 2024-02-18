import React, { useState } from 'react'
import { fetchDataFromApi } from '../utils/api';
import Card from '../components/Card/Card';
import Loader from '../components/Loader/Loader';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useParams } from 'react-router-dom';
import { useFetchMedia } from '../hooks/useFetch';

const years = Array.from({ length: 2024 - 1950 + 1 }, (_, index) => 2024 - index);

function Explore() {
  const [media, setMedia] = useState([]);
  const [pageNum, setPageNum] = useState(2);
  const [totalPages, setTotalPages] = useState(0);
  const [genreId, setGenreId] = useState('');
  const [year, setYear] = useState('');
  const {mediaType} = useParams();

  async function fetchNextPageData(){
    const res = await fetchDataFromApi(`/discover/${mediaType}?with_genres=${genreId}&page=${pageNum}&primary_release_year=${year}`);
    setMedia([...media, ...res.results]);
    setPageNum(p => p + 1);
  }

  const isLoading = useFetchMedia(`/discover/${mediaType}?with_genres=${genreId}&primary_release_year=${year}`, setMedia, setTotalPages);

  return (
    <>
      <InfiniteScroll next={fetchNextPageData} loader={<Loader />} hasMore={pageNum <= totalPages} dataLength={media?.length} >
        <div className='container'>
          <h1>{mediaType === 'movie' ? 'MOVIES' : 'TV SERIES'}</h1>
          <div className='filter'>
            <div className='filter-title'>Filter:</div>          
            <div className='genre flex-row-center'>
              <div className='filter-text'>By Genre</div> 
              <select onChange={(e) => setGenreId(e.target.value)}>
                <option value="">All</option>
                {mediaType === "tv" ? <option value="10759">Action & Adventure</option> : 
                  <><option value="28">Action</option>
                  <option value="12">Adventure</option></>
                }
                <option value="16">Animation</option>
                <option value="35">Comedy</option>
                {mediaType === "movie" && <option value="27">Horror</option>}
                <option value="37">Western</option>
              </select>
            </div>
            {mediaType === "movie" && <div className='year flex-row-center'>
              <div className='filter-text'>By Year</div>
              <select onChange={(e) => setYear(e.target.value)}>
                <option value="">All</option>
                {years.map(y => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>
            </div>}
          </div>
          <div className='container-items min-ht'>
            {isLoading ? <Loader /> : media?.length > 0 ?
            media?.map(i => (
              <Card key={i.id} item={i} category={mediaType} />
            )) : <h1>No Results Found</h1>
            }
          </div>
        </div>
      </InfiniteScroll>
    </>
  )
}

export default Explore