import React, { useEffect, useState } from 'react'
import FlipNumbers from 'react-flip-numbers';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import SwipeableViews from 'react-swipeable-views';
import { useRouter } from 'next/router';
import API from '../../../../src/api/services/API';
import { useAtom } from 'jotai';
import apiAtom from '../../../../src/jotai/apiAtom';
import moment from 'moment';

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
    const router = useRouter();

    const [index, setIndex] = useState((0));
    const [data, setData] = useAtom(apiAtom.contestDetail);
    const [game, setGame] = useAtom(apiAtom.gameDetail);

    const [ldb, setLdb] = useAtom(apiAtom.megaLeaderboard)
    const [ldbRanks, setLdbRanks] = useAtom(apiAtom.megaLeaderboardRanks)
    const [opt, setopt] = useAtom(apiAtom.megaLeaderboardOpt)




    const handleChange = (event, value) => {
        setIndex(value);
        handleApiCall(value)
    };

    const handleChangeIndex = index => {
        setIndex(index);
        handleApiCall(index)
    };

    const handleApiCall = (index) => {
        if (index == 1) {
            let tkn = router?.query?.token;
            let game_id = router?.query?.game_id;
            let contest_id = router?.query?.contest_id;

            if (!tkn || !game_id || !contest_id) return;
            API.megaLeaderboard({
                params: {
                    game_id: game_id,
                    contest_id: contest_id
                }
            }, () => { }, tkn)
        }
    }

    useEffect(() => {
        if (!router.isReady) return;
        let tkn = router?.query?.token;
        let game_id = router?.query?.game_id;
        let contest_id = router?.query?.contest_id;

        if (!tkn || !game_id || !contest_id) return;

        API.contestDetail({ id: contest_id }, (d) => {

            if (!Object.keys(game).length) {
                API.gameDetail({ id: game_id }, (d) => {
                }, tkn);
            }


        }, tkn);



    }, [router.isReady])

    const handleBack = () => {
        router.back();
    }


    return (
        <>
            <div className="mobileview">
                <div className="mobile-header">
                    <div className="prize-heading">
                        <div className="left-arrow" onClick={handleBack} >
                            <img src="/img/left-arrow.png" alt="" />
                        </div>
                        <div className="tournament">
                            <div className="tour-img">
                                <img src={game?.image || "/img/pineapple.png"} alt="" />
                            </div>
                        </div>
                        <div className='ph-3' >
                            <h6>Tournament</h6>
                            <small>{game?.name}</small>
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
                                        <img src={game?.image || "/img/contest-knif.png"} alt="" />
                                    </div>
                                    <div className="grand-content">
                                        <div className="grand-star">
                                            <img src="/img/star.png" alt="" />
                                            <h6>GRAND CONTEST!</h6>
                                        </div>
                                        <div className="grand-prize">
                                            <h5>{`  ₹${`${data?.prize}`.includes('.00') ?
                                                parseFloat(data?.prize || "0").toFixed(0) : data?.prize}`}</h5>
                                            <p>Make your highest score and win unreal cash<span> rewards T&C Apply!</span></p>



                                        </div>
                                    </div>
                                </div>
                                <div className="play-wiin">
                                    <div className="play-content">
                                        <div className="play-user">
                                            <img src="/img/user.png" alt="" />
                                            <p>{" "} {data?.total_teams}/{data?.group_teams}  Players</p>
                                        </div>
                                        <div className="play-user">
                                            <img src="/img/1st.png" alt="" className='mon' />
                                            <p>{" "} ₹{data?.prize_breakup?.length ? data?.prize_breakup[0]?.prize : ""}  </p>
                                        </div>
                                        <div className="play-user">
                                            <img src="/img/time.png" alt="" className='time' />
                                            <p className='mon'>{" "} {moment(data?.starting_at).format('HH:mm A, MMM DD') + " - " + moment(data?.ending_at).format('HH:mm A, MMM DD')}</p>
                                        </div>
                                    </div>
                                    <div className="play-btn">
                                        {/* <button>Play ₹{`${`${data?.entry_fee}`.includes('.00') ? parseFloat(data?.entry_fee || '0').toFixed(0) : data?.entry_fee}`}</button> */}
                                    </div>
                                </div>
                            </div>

                            <div className="prize-breakup" >
                                <span className='pb-head' >
                                    <p>Rank</p>
                                    <p>Prize</p>
                                </span>
                                {
                                    data?.prize_breakup?.length ?

                                        data?.prize_breakup?.map((p, i) => {
                                            return (
                                                <span className={`pb-row ${i % 2 === 0 ? "pb-even" : ""} `} >
                                                    <p>{p?.from == p?.to ? p?.from : p?.from + " - " + p?.to}</p>
                                                    <p>{`₹${`${p?.prize}`.includes('.00') ?
                                                        parseFloat(p?.prize || "0").toFixed(0) : p?.prize}`}</p>
                                                </span>
                                            )
                                        })
                                        : ""
                                }
                                <br />
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