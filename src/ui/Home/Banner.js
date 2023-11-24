import React, { useEffect, useState } from 'react'
import { fetchDataFromApi } from '../../utils/api';
import styles from './Banner.module.css';
import Loader from '../../components/Loader/Loader';
import SearchBar from '../../features/search/SearchBar';

function Banner() {
    const [bannerBackground, setBannerBackground] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(function () {
        fetchBannerMovie();
    }, []);

    async function fetchBannerMovie() {
        setIsLoading(true);
        const res = await fetchDataFromApi('/movie/now_playing');
        const imgUrl = 'https://image.tmdb.org/t/p/original/' + res.results[Math.floor(Math.random() * 20)].poster_path;
        setBannerBackground(imgUrl);
        setIsLoading(false);
    }

    return (
        <>
            {isLoading ? <Loader /> :
            <div className={styles.heroBanner}>
                <div className={styles.backdropImg}>
                    <img src={bannerBackground} alt="" />
                </div>
                <div className={styles.opacityLayer}></div>
                <div className={styles.heroBannerContent}>
                    <span className={styles.title}>Welcome.</span>
                    <span className={styles.subTitle}>
                        Millions of movies, TV shows and people to discover.
                        Explore now.
                    </span>
                    <SearchBar />
                </div>
            </div>
            }
        </>
    )
}

export default Banner