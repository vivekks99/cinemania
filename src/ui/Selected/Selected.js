import React, { useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { fetchDataFromApi } from '../../utils/api';
import Loader from '../../components/Loader/Loader';
import styles from './Selected.module.css';
import StarRating from '../../components/StarRating/StarRating';
import { useDispatch, useSelector } from 'react-redux';
import { addFavoriteMovie, addFavoriteTvSeries, getSavedMovies, getSavedTvSeries } from '../../features/favorites/favoritesSlice';
import Rated from './Rated';

function Selected() {
    const { mediaType, id } = useParams();
    const [selected, setSelected] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');

    const [params] = useSearchParams();
    const category = params.get("category");

    const dispatch = useDispatch();
    const savedMovies = useSelector(getSavedMovies);
    const savedTvSeries = useSelector(getSavedTvSeries);

    const isMovieRated = savedMovies.find(i => i.id === Number(id));
    const isTvSeriesRated = savedTvSeries.find(i => i.id === Number(id));

    const imgUrl = 'https://image.tmdb.org/t/p/original/' + selected.poster_path;

    function handleSubmit(e){
        e.preventDefault();
        const favoriteObj = {...selected, userRating: rating, comment, mediaType: mediaType || category};
        if(mediaType === "movie" || category === "movie"){
            dispatch(addFavoriteMovie(favoriteObj));
        }
        else dispatch(addFavoriteTvSeries(favoriteObj));
    }

    useEffect(function () {
        async function fetchMovies() {
            setIsLoading(true);
            const res = await fetchDataFromApi(`/${mediaType || category}/${id}`);
            console.log(res)
            setSelected(res);
            setIsLoading(false);
        }
        fetchMovies();
    }, [mediaType, category, id]);

    return (
        <>
            {isLoading ? <Loader /> :
            <div className={styles.selectedContainer}>
                <div className={styles.selectedContent}>
                    <div className={styles.left}>
                        <img src={imgUrl} alt="" />
                    </div>
                    <div className={styles.right}>
                        <h1>{selected.name || selected.title}</h1>
                        <div className={styles.tagline}>{selected.tagline}</div>
                        {selected.overview && 
                        <div className={styles.overview}>
                            <h3>Overview</h3>
                            <p>{selected.overview}</p>
                        </div>
                        }
                        {selected.release_date && <div className={styles.contentList}><span>Release Date: </span>{selected.release_date}</div>}
                        <div className={styles.contentList}><span>IMDB Rating: </span>{selected.vote_average}/10</div>
                    </div>
                </div>
                <div>
                <form className={styles.selectedForm} onSubmit={handleSubmit}>
                    {isMovieRated || isTvSeriesRated ? <Rated isMovieRated={isMovieRated} isTvSeriesRated={isTvSeriesRated}  maxRating={10} color="#fcc419" size={24} /> : <>
                    <div className={styles.formInput}>
                        <div className={`${styles.flexCol} ${styles.justifyEvenly} ${styles.mb}`}>
                            <span>Rate this {mediaType || category === "movie" ? "Movie" : "TV-Series"}</span>
                            <StarRating maxRating={10} size={24} rating={rating} setRating={setRating} />
                        </div>
                        <div className={styles.flexCol}><span>Post Comments</span><textarea value={comment} onChange={(e) => setComment(e.target.value)}></textarea></div>
                    </div>
                    <div className={styles.formBtn}><button type="submit" disabled={rating === 0} className={`${styles.submitBtn} ${rating === 0 && styles.disabled}`}>Add to Favorites</button></div></>}
                </form>
                </div>
            </div>}
        </>
    )
}

export default Selected