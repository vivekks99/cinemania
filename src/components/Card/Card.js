import React from 'react'
import styles from './Card.module.css'
import { useNavigate } from 'react-router-dom';

function Card({ item, category }) {
    const navigate = useNavigate();

    if(item.poster_path === null) return;
    const imgUrl = 'https://image.tmdb.org/t/p/original/' + item.poster_path;

    return (
        <>
            <div className={styles.cards} onClick={() => navigate(`${item.id}?category=${category}`)}>
                <div className={styles.poster}>
                    <div className={styles.pic}>
                        <img src={imgUrl} alt={item.title} />
                    </div>
                </div>
                <div className={styles.cardContent}>
                    <p className="title">{item.title || item.name}</p>
                </div>
            </div>
        </>
    )
}

export default Card