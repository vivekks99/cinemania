import React, { useState } from 'react'
import { fetchDataFromApi } from '../utils/api';
import Card from '../components/Card/Card';
import Loader from '../components/Loader/Loader';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useParams, useSearchParams } from 'react-router-dom';
import { useFetchMedia } from '../hooks/useFetch';

function SeeMore() {
  const [media, setMedia] = useState([]);
  const [pageNum, setPageNum] = useState(2);
  const [totalPages, setTotalPages] = useState(0);
  const {mediaType} = useParams();
  const [params] = useSearchParams();
  const type = params.get("type");

  async function fetchNextPageData(){
    const res = await fetchDataFromApi(`/${mediaType}/${type}?page=${pageNum}`);
    setMedia([...media, ...res.results]);
    setPageNum(p => p + 1);
  }

  const isLoading = useFetchMedia(`/${mediaType}/${type}`, setMedia, setTotalPages);

  return (
    <>
      <InfiniteScroll next={fetchNextPageData} loader={<Loader />} hasMore={pageNum <= totalPages} dataLength={media?.length} >
        <div className='container'>
            <h1>{mediaType === 'movie' ? 'MOVIES' : 'TV SERIES'}</h1>
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

export default SeeMore