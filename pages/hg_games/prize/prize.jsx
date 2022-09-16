import React, { useEffect, useState } from 'react'
import FlipNumbers from 'react-flip-numbers';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import SwipeableViews from 'react-swipeable-views';

const styles = {
    tabs: {
        background: '#fff',
        height: "40px"
    },
    tab: {
        width: "50%"
    },
    slide: {
        padding: 15,
        minHeight: '80vh',
        color: '#fff',
    },
    slide1: {
        backgroundColor: '#FEA900',
    },
    slide2: {
        backgroundColor: '#B3DC4A',
    },
    slide3: {
        backgroundColor: '#6AC0FF',
    },
};

function HgGames() {
    const [index, setIndex] = useState((0))



    const handleChange = (event, value) => {
        setIndex(value);
    };

    const handleChangeIndex = index => {
        setIndex(index);
    };


    return (
        <>
            <div className="mobileview">
                <div className="mobile-header">
                    <div className="prize-heading">
                        <div className="left-arrow">
                            <img src="/img/left-arrow.png" alt="" />
                        </div>
                        <div className="tournament">
                            <div className="tour-img">
                                <img src="/img/pineapple.png" alt="" />
                            </div>
                        </div>
                        <div className='ph-3' >
                            <h6>Tournament</h6>
                            <small>Knife Ninja</small>
                        </div>
                    </div>
                </div>
                <div>
                    <Tabs value={index} fullWidth onChange={handleChange} style={styles.tabs}>
                        <Tab label="Prizes" style={styles.tab} />
                        <Tab label="Leaderboard" style={styles.tab} />
                    </Tabs>
                    <SwipeableViews index={index} onChangeIndex={handleChangeIndex}>
                        <div style={Object.assign({}, styles.slide, styles.slide1)}>slide n°1</div>
                        <div style={Object.assign({}, styles.slide, styles.slide2)}>
                            slide n°2

                        </div>
                    </SwipeableViews>
                </div>
            </div>





        </>
    )
}

export default HgGames