import React, { useEffect, useState } from 'react'
import { fetchDataFromApi } from '../../utils/api';
import Loader from '../../components/Loader/Loader';
import CardCarousel from '../../components/Card/CardCarousel';
import SwitchTabs from '../../components/SwitchTabs/SwitchTabs';
import { useNavigate } from 'react-router-dom';

function Slider({sliderType, sliderTitle}) {
  const [media, setMedia] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentTab, setCurrentTab] = useState("movie");

  const navigate = useNavigate();

  useEffect(function(){
    async function fetchMedia() {
      setIsLoading(true);
      const res = await fetchDataFromApi(`/${currentTab}/${sliderType}`);
      setMedia(res.results);
      setIsLoading(false);
      console.log(res);
    }
    fetchMedia();
  }, [currentTab, sliderType]);

  return (
    <>
      <div className='scroll-container'>
        <div className='scroll-header'>
          <div className="scroll-title">{sliderTitle}</div>
          <div className="header-right">
            <SwitchTabs currentTab={currentTab} setCurrentTab={setCurrentTab} />
            <div className="see-more"><span onClick={() => navigate(`/see-more/${currentTab}?type=${sliderType}`)}>See more &rarr;</span></div>
          </div>
        </div>
        {isLoading ? <Loader /> : <div className="cardsOverflow">
            {
            media?.map(i => (
                <CardCarousel key={i.id} item={i} category={currentTab} />
            ))}
        </div>}
      </div>
    </>
  )
}

export default Slider