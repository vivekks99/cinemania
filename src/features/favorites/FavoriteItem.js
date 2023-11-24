import React from 'react'
import { useDispatch } from 'react-redux';
import { deleteFavoriteMovie, deleteFavoriteTvSeries } from './favoritesSlice';
import { useNavigate } from 'react-router-dom';

function FavoriteItem({item}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const imgUrl = 'https://image.tmdb.org/t/p/original/' + item.poster_path;

  function handleDelete(){
    if(item.mediaType === "movie") dispatch(deleteFavoriteMovie(item.id));
    else dispatch(deleteFavoriteTvSeries(item.id));
  }

  return (
    <div className='favorites-item-container'>
        <div className='fav-img'><img src={imgUrl} alt="" onClick={() => navigate(`${item.id}?category=${item.mediaType}`)} /></div>
        <div className="movie-details">
            <div className='title'>{item.title || item.name}</div>
            <div className="imdb-rating"><span>IMDB Rating: </span>{item.vote_average}/10</div>
            <div className="user-rating"><span>User Rating: </span>{item.userRating}/10</div>
        </div>
        <div className="user-comment">
            <div className='comment-title'>User Comment</div>
            <div className='comment-content'>{item.comment === '' ? <span>No Comments</span> : item.comment}</div>
        </div>
        <div className='delete-icon' onClick={handleDelete}>
            <i className="fas fa-trash"></i>
        </div>
    </div>
  )
}

export default FavoriteItem