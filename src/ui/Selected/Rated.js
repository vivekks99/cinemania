import React from 'react'
import styles from './Selected.module.css'
import Star from '../../components/StarRating/Star';

const starContainerStyle = {
    display: "flex",
};

function Rated({isMovieRated, isTvSeriesRated, maxRating, color, size}) {
    const rating = isMovieRated?.userRating || isTvSeriesRated?.userRating;
    const comment = isMovieRated?.comment || isTvSeriesRated?.comment;
    console.log(comment);
    return (
        <>
            <div className={styles.rated}>
                <p>You Rated {rating}/10 Stars</p>
                <div style={starContainerStyle}>
                    {Array.from({ length: maxRating }, (_, i) => (
                        <Star key={i} full={rating ? rating >= i + 1 : rating >= i + 1} color={color} size={size} />
                    ))}
                </div>
            </div>
            <div>
                <div className={styles.comment}>
                    <div>Your Comment</div>
                    <div className={styles.commentContent}>{comment === undefined ? <span>No Comments</span> : comment}</div>
                </div>
            </div>
        </>
    )
}

export default Rated