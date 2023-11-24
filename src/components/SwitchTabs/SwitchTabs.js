import React from 'react'
import styles from './SwitchTabs.module.css'

function SwitchTabs({currentTab, setCurrentTab}) {
    return (
        <div className={styles.tabsContainer}>
            <div className={styles.switchingTabs}>
                <div className={styles.tabItems}>
                    <span className={`${styles.tabItem} ${currentTab === "movie" && styles.active}`} onClick={() => setCurrentTab("movie")}>Movies</span>
                    <span className={`${styles.tabItem} ${currentTab === "tv" && styles.active}`} onClick={() => setCurrentTab("tv")}>Series</span>
                    <span className={styles.movingBg} />
                </div>
            </div>
        </div>
    )
}

export default SwitchTabs