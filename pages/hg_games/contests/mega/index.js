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

        minHeight: '80vh',

    },
    slide1: {

    },
    slide2: {

    },
    slide3: {

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
                        <div style={Object.assign({}, styles.slide, styles.slide1)}>

                            <div className="grand-contest">
                                <div className="grand-con">
                                    <div className="kniiif-img">
                                        <img src="/img/contest-knif.png" alt="" />
                                    </div>
                                    <div className="grand-content">
                                        <div className="grand-star">
                                            <img src="/img/star.png" alt="" />
                                            <h6>GRAND CONTEST!</h6>
                                        </div>
                                        <div className="grand-prize">
                                            <h5>₹1000</h5>
                                            <p>Make your highest score and win unreal cash<span> rewards T&C Apply!</span></p>
                                        </div>
                                    </div>
                                </div>
                                <div className="play-wiin">
                                    <div className="play-content">
                                        <div className="play-user">
                                            <img src="/img/user.png" alt="" />
                                            <p>703/1.5k  Players</p>
                                        </div>
                                        <div className="play-user">
                                            <img src="/img/1st.png" alt="" className='mon' />
                                            <p>₹80  Players</p>
                                        </div>
                                        <div className="play-user">
                                            <img src="/img/time.png" alt="" className='time' />
                                            <p className='mon'>9:30pm, Aug31 - 9:30 pm, Sep 1</p>
                                        </div>
                                    </div>
                                    <div className="play-btn">
                                        {/* <button>Play ₹1</button> */}
                                    </div>
                                </div>
                            </div>

                            <div className="prize-breakup" >
                                <span className='pb-head' >
                                    <p>Rank</p>
                                    <p>Prize</p>
                                </span>
                                {
                                    Array.from({ length: 4 }).map((d, i) => {
                                        return (
                                            <span className={`pb-row ${i % 2 === 0 ? "pb-even" : ""} `} >
                                                <p>Rank</p>
                                                <p>10</p>
                                            </span>
                                        )
                                    })
                                }
                            </div>
                        </div>
                        <div style={Object.assign({}, styles.slide, styles.slide2)}>
                            <div className="leaderboard-rank">
                                <div className="rank-list">
                                    <div className="first-rank">
                                        <h5>2</h5>
                                        <img src="/img/thor-2.png" alt="" className='rank-dp' />
                                        <h6 className='points'>10</h6>
                                        <h6 className='name-win'>Thor</h6>
                                    </div>
                                </div>
                                <div className="rank-list">
                                    <div className="first-rank">
                                        <img src="/img/crown.png" alt="" className='crown' />
                                        <img src="/img/piter.png" alt="" className='firstrank-dp' />
                                        <h6 className='points'>20</h6>
                                        <h6 className='name-win'>Piter</h6>
                                    </div>
                                </div>
                                <div className="rank-list">
                                    <div className="first-rank">
                                        <h5>3</h5>
                                        <img src="/img/wanda.png" alt="" className='rank-dp' />
                                        <h6 className='points'>15</h6>
                                        <h6 className='name-win'> Wanda</h6>
                                    </div>
                                </div>
                            </div>
                            {/* <div className="teams-main">
                                <div className="team">
                                    <h6>Teams</h6>
                                </div>
                                <div className="team-rank">
                                    <h6>Rank</h6>
                                </div>
                            </div> */}
                            <div className="teamname">
                                <div className='team-bg tb-mine'>
                                    <span className='tb-l' >
                                        <div className="teamane-main">
                                            <div className="team-img">
                                                <img src="/img/captain.png" alt="" className='team-dp' />
                                            </div>
                                            <div className="tename">
                                                <h5>Teamname</h5>
                                                <h6>1400</h6>
                                            </div>
                                        </div>
                                    </span>
                                    <span className='tb-r' >
                                        <h5 className='rankt'>#15</h5>
                                    </span>

                                </div>

                                {
                                    Array.from({ length: 3 }).map((d) => {
                                        return (
                                            <div className='team-bg'>
                                                <span className='tb-l' >
                                                    <div className="teamane-main">
                                                        <div className="team-img">
                                                            <img src="/img/captain.png" alt="" className='team-dp' />
                                                        </div>
                                                        <div className="tename">
                                                            <h5>Teamname</h5>
                                                            <h6>1400 Points</h6>
                                                        </div>
                                                    </div>
                                                </span>
                                                <span className='tb-r' >
                                                    <h5 className='rankt'>#15</h5>
                                                </span>

                                            </div>
                                        )
                                    })
                                }

                            </div>

                        </div>
                    </SwipeableViews>
                </div>
            </div>





        </>
    )
}

export default HgGames