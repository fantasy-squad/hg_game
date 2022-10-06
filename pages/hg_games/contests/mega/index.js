import React, { useEffect, useState } from 'react'
import FlipNumbers from 'react-flip-numbers';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import SwipeableViews from 'react-swipeable-views';
import { useRouter } from 'next/router';
import API from '../../../../src/api/services/API';
import { useAtom, useAtomValue } from 'jotai';
import apiAtom from '../../../../src/jotai/apiAtom';
import moment from 'moment';
import GrandContestCard from '../../../../src/components/contests/GrandContestCard';
import { toast } from 'react-hot-toast';

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
    const user = useAtomValue(apiAtom.user)




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

            API.megaLeaderboardRanks({
                params: {
                    game_id: game_id,
                    contest_id: contest_id,
                    page: 0,
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

    const [bottom, setBottom] = useState(100)

    useEffect(() => {
        if (!router.isReady) return;
        let page = 0;
        document.addEventListener('scroll', () => {
            if (document.documentElement.scrollHeight === window.pageYOffset + window.innerHeight) {
                // Do something
                let tkn = router?.query?.token;
                let game_id = router?.query?.game_id;
                let contest_id = router?.query?.contest_id;

                // console.log(opt)
                console.log(page)
                // console.log(tkn, game_id, contest_id)
                if (!tkn || !game_id || !contest_id) return;

                page = page + 1

                API.megaLeaderboardRanks({
                    params: {
                        game_id: game_id,
                        contest_id: contest_id,
                        page: page,
                    }
                }, () => { }, tkn)

            }
        })




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
                            <GrandContestCard d={data} />

                            {/* <div className="grand-contest">
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

                                    </div>
                                </div>
                            </div> */}

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
                            <div className="rules-regulation prize-breakup">
                                <div className="rules-content ">
                                    <h4 className="rules">Tournament Rules : </h4>
                                    <p>1. This is Grand Tournament. </p>
                                    <p>
                                        2. After registration , you will get 1 chance to make your
                                        highest score in the game . If more chances are needed for
                                        you to improve your high score , you can re - enter the
                                        tournament and buy one more chance .
                                    </p>

                                    <p>
                                        3. Place yourself on the leaderboard to win unreal cash
                                        rewards . You can win up to ₹{data?.prize} 😱
                                    </p>

                                    <p>
                                        4. Rewards are given only at the end of the tournament .
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div style={Object.assign({}, styles.slide, styles.slide2)}>
                            <div className="leaderboard-rank">
                                <div className="rank-list">
                                    <div className="first-rank">
                                        <h5>{ldb?.second?.rank}</h5>
                                        <img src={ldb?.second?.user?.photo || "/img/thor-2.png"} alt="" className='rank-dp' />
                                        <h6 className='points'>{ldb?.second?.total_points}</h6>
                                        <h6 className='name-win'>{ldb?.second?.user?.username}</h6>
                                    </div>
                                </div>
                                <div className="rank-list">
                                    <div className="first-rank">
                                        <img src="/img/crown.png" alt="" className='crown' />
                                        <img src={ldb?.first?.user?.photo || "/img/piter.png"} alt="" className='firstrank-dp' />
                                        <h6 className='points'>{ldb?.first?.total_points}</h6>
                                        <h6 className='name-win'>{ldb?.first?.user?.username}</h6>
                                    </div>
                                </div>
                                <div className="rank-list">
                                    <div className="first-rank">
                                        <h5>{ldb?.third?.rank}</h5>
                                        <img src={ldb?.third?.user?.photo || "/img/wanda.png"} alt="" className='rank-dp' />
                                        <h6 className='points'>{ldb?.third?.total_points}</h6>
                                        <h6 className='name-win'> {ldb?.third?.user?.username}</h6>
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
                                                <h5>{ldb?.my_leaderboard?.user?.username || user?.username}</h5>
                                                <h6>{ldb?.my_leaderboard?.total_points}</h6>
                                            </div>
                                        </div>
                                    </span>
                                    <span className='tb-r' >
                                        <h5 className='rankt'>{ldb?.my_leaderboard?.rank}</h5>
                                    </span>

                                </div>

                                {
                                    ldbRanks?.length ?

                                        ldbRanks?.map((d) => {
                                            return (
                                                <div className='team-bg'>
                                                    <span className='tb-l' >
                                                        <div className="teamane-main">
                                                            <div className="team-img">
                                                                <img src="/img/captain.png" alt="" className='team-dp' />
                                                            </div>
                                                            <div className="tename">
                                                                <h5>{d?.user?.username}</h5>
                                                                <h6>{d?.total_points} Points</h6>
                                                            </div>
                                                        </div>
                                                    </span>
                                                    <span className='tb-r' >
                                                        <h5 className='rankt'>{d?.rank}</h5>
                                                    </span>

                                                </div>
                                            )
                                        }) : <></>
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