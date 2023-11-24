import React from 'react'
import styles from './Footer.module.css'

function Footer() {
  return (
    <div className={styles.footerBottom}>
        <div className={styles.linksContainer}>
          <div className={styles.linksHeading}>
              <div>Follow Us On:</div>
          </div>
          <div className={styles.socialLinks}>
              <a href="https://www.facebook.com/" target="_" className={styles.fb}><i className="fab fa-facebook"></i></a>
              <a href="https://www.instagram.com/" target="_" className={styles.insta}><i className="fab fa-instagram-square"></i></a>
              <a href="https://www.youtube.com/" target="_" className={styles.yt}><i className="fab fa-youtube"></i></a>
              <a href="https://www.pinterest.com/" target="_" className={styles.pnt}><i className="fab fa-pinterest"></i></a>
          </div>
        </div>
        <div className={styles.copyright}>
            <h3>@Cinemania All Rights Reserved</h3>
        </div>
    </div>
  )
}

export default Footer