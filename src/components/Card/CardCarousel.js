import React from 'react'
import styles from './CardCarousel.module.css'
import { useNavigate } from 'react-router-dom';

function CardCarousel({item, category}) {
  const navigate = useNavigate();

  const imgUrl = 'https://image.tmdb.org/t/p/original/' + item.poster_path;

  return (
    <div className={styles.movieCard} onClick={() => navigate(`/see-more/${category}/${item.id}`)}>
        <div className={styles.posterBlock}>
            <img className={styles.posterImg} src={imgUrl} alt="" />
        </div>
        <div className={styles.textBlock}>
            <span className={styles.title}>{item.title || item.name}</span>
        </div>
    </div>
  )
}

export default CardCarousel