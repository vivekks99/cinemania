import React, { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { fetchDataFromApi } from '../utils/api';
import Loader from '../components/Loader/Loader';
import Card from '../components/Card/Card';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useFetchMedia } from '../hooks/useFetch';

function SearchResults() {
  const [results, setResults] = useState([]);
  const [filterValue, setFilterValue] = useState("multi");
  const [pageNum, setPageNum] = useState(2);
  const [totalPages, setTotalPages] = useState(0);

  const [searchParams] = useSearchParams();
  const query = searchParams.get("query");

  async function fetchNextPageData(){
    const res = await fetchDataFromApi(`/search/${filterValue}?query=${query}&page=${pageNum}`);
    setResults([...results, ...res.results]);
    setPageNum(p => p + 1);
  }

  const isLoading = useFetchMedia(`/search/${filterValue}?query=${query}`, setResults, setTotalPages);

  return (
    <>
      <div className='search-results-container'>
        <div className='flex-col-center'>
          <div className='results-header'>
            <div className='results-title'>Showing Results for {query}</div>
          </div>
          <div className='filter flex-row-center'>
            <div className='filter-title'>Filter:</div>
            <div>
              <select onChange={(e) => setFilterValue(e.target.value)}>
                <option value="multi"></option>
                <option value="movie">Movies</option>
                <option value="tv">TV Series</option>
              </select>
            </div>
          </div>
        </div>
        <InfiniteScroll next={fetchNextPageData} loader={<Loader />} hasMore={pageNum <= totalPages} dataLength={results?.length}>
          <div className='container-items'>
            {isLoading ? <Loader /> : results?.length > 0 ? 
            results?.map(i => (
              <Card key={i.id} item={i} category={i.media_type || filterValue} />
            )) : <h1>No Results Found</h1>
          }
          </div>
        </InfiniteScroll>
      </div>
    </>
  )
}

export default SearchResults