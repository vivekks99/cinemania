import React, { useCallback, useEffect, useState } from 'react'
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
    const [isGalleryLoading, setIsGalleryLoading] = useState(false);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [images, setImages] = useState();
    const [comments, setComments] = useState();
    const [isCommentLoading, setIsCommentLoading] = useState(false);

    const [params] = useSearchParams();
    const category = params.get("category");

    const dispatch = useDispatch();
    const savedMovies = useSelector(getSavedMovies);
    const savedTvSeries = useSelector(getSavedTvSeries);

    const isMovieRated = savedMovies.find(i => i.id === Number(id));
    const isTvSeriesRated = savedTvSeries.find(i => i.id === Number(id));

    const imgUrl = 'https://image.tmdb.org/t/p/original/' + selected.poster_path;

    const date = new Date(selected.release_date);

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
            setSelected(res);
            setIsLoading(false);
        }
        fetchMovies();
    }, [mediaType, category, id]);

    const fetchGallery = useCallback(async function fetchGallery(){
            setIsGalleryLoading(true);
            const res = await fetchDataFromApi(`/${mediaType || category}/${id}/images`);
            setImages(res.backdrops);
            setIsGalleryLoading(false);
    }, [mediaType, category, id]);

    const fetchComments = useCallback(async function fetchComments(){
            setIsCommentLoading(true);
            const res = await fetchDataFromApi(`/${mediaType || category}/${id}/reviews`);
            setComments(res.results);
            setIsCommentLoading(false);
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
                        <h1>{selected.name || selected.title} {date.getFullYear() ? `(${date.getFullYear()})` : ''}</h1>
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

                <div className={styles.toggleBtns}>
                    <div className={styles.expandBtn} onClick={() => fetchGallery()}><h2>View Gallery</h2></div>
                </div>
                {isGalleryLoading ? <Loader /> :  images?.length > 0 &&
                <div className={styles.gallery}>
                    <div className={styles.cards}>
                            {images?.map(i => (
                                <img src={'https://image.tmdb.org/t/p/original/' + i.file_path} alt="" key={i} />
                            ))}
                    </div>
                </div>}

                <div>
                    <form className={styles.selectedForm} onSubmit={handleSubmit}>
                        {
                            isMovieRated || isTvSeriesRated ? <Rated isMovieRated={isMovieRated} isTvSeriesRated={isTvSeriesRated}  maxRating={10} color="#fcc419" size={24} /> 
                        : 
                        <>
                            <div className={styles.formInput}>
                                <div className={`${styles.flexCol} ${styles.justifyEvenly} ${styles.mb}`}>
                                    <span>Rate this {mediaType || category === "movie" ? "Movie" : "TV-Series"}</span>
                                    <StarRating maxRating={10} size={24} rating={rating} setRating={setRating} />
                                </div>
                                <div className={styles.flexCol}><span>Post Comments</span><textarea value={comment} onChange={(e) => setComment(e.target.value)}></textarea></div>
                            </div>
                            <div className={styles.formBtn}><button type="submit" disabled={rating === 0} className={`${styles.submitBtn} ${rating === 0 && styles.disabled}`}>Add to Favorites</button></div>
                        </>}
                    </form>
                </div>

                <div className={styles.commentContainer}>
                    <div className={styles.expandBtn} onClick={() => fetchComments()}>View Comments</div>
                    {isCommentLoading ? <Loader /> : comments?.map(i => (
                        <div className={styles.commentSection} key={i}>
                            <div className={styles.header}>
                                {i.author_details.avatar_path ? <img src={'https://image.tmdb.org/t/p/original/' + i.author_details.avatar_path} alt="" /> : <div className={styles.avatar}><i className="fas fa-user"></i></div>
                                }
                                <div className={styles.author}>
                                    {i.author}
                                </div>
                                {i.author_details.rating && <div className={styles.rating}>
                                    {i.author_details.rating}/10
                                </div>}
                            </div>
                            <div className={styles.footer}>
                                <div className={styles.content}>
                                    {i.content}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>}
        </>
    )
}

export default Selected