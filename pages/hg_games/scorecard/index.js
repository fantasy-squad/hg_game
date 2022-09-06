import { useAtom } from 'jotai';
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import API from '../../../src/api/services/API';
import apiAtom from '../../../src/jotai/apiAtom';

function ScoreCard() {

    const router = useRouter();
    const [seconds, setSeconds] = useState(30);
    const [data, setData] = useAtom(apiAtom.myScore)
    const [game, setGame] = useAtom(apiAtom.gameDetail)



    useEffect(() => {
        if (!router.isReady) return;

        let tkn = router?.query?.token;
        let user_id = router?.query?.user_id;
        let contest_id = router?.query?.contest_id;
        let group_id = router?.query?.group_id;
        let score = router?.query?.score;
        let game_id = router?.query?.game_id;

        API.Socket((s) => {

        });

        if (game_id) {


            API.gameDetail({ id: game_id }, (d) => {

            }, tkn)
        }



        setTimeout(() => {
            if (!tkn || !user_id || !group_id || !contest_id) return;


            API.getScore({
                body: {
                    contest_id,
                    user_id,
                    group_id,
                }
            }, (d) => {

            }, tkn, () => {

            })
        }, 30000)

    }, [router.isReady]);

    const handleBack = () => {
        let tkn = router?.query?.token;
        let user_id = router?.query?.user_id;
        let contest_id = router?.query?.contest_id;
        let group_id = router?.query?.group_id;
        if (data?.contest?.hg_game_id) {

            router.push(`/hg_games/contests?user_id=${user_id}&token=${tkn}&game_id=${data?.contest?.hg_game_id}`)
        }

    }


    useEffect(() => {
        // startTimer()

        let timer;
        if (seconds > 0) {
            timer = setInterval(() => {
                clearInterval(timer);

                if (seconds > 1) {
                    setSeconds(p => p - 1);

                } else {


                }
            }, 1000);

        } else if (seconds == 0) {
            clearInterval(timer);

        } else {
            clearInterval(timer);
        }
        return () => {
            clearInterval(timer);

        }

    }, [seconds]);

    const secondsToTime = (secs) => {

        let hours = Math.floor(secs / (60 * 60));
        let divisor_for_minutes = secs % (60 * 60);
        let minutes = Math.floor(divisor_for_minutes / 60);
        let divisor_for_seconds = divisor_for_minutes % 60;
        let seconds = Math.ceil(divisor_for_seconds);

        let obj = {
            "h": hours,
            "m": minutes,
            "s": seconds
        };
        return `${hours}h:${minutes}m:${seconds}s`;
    }



    return (
        <div class="mobileview">
            <div class="mobile-header mobile-head">
                <div class="knifee">
                    <img src="/img/back.png" class="back" onClick={handleBack} />
                    {
                        game?.image
                            ?

                            <img src={game?.image || ""} class="kniffff" />
                            :

                            <div className='shine image-loading'  ></div>

                    }
                    {
                        game?.name
                            ?

                            <h6 className="mx-auto">{game?.name || ""}</h6>
                            :

                            <lines class="shine name-loading"></lines>


                    }

                </div>
                <div class="walett">
                    {/* <img src="/img/wallet.png"  />
                    <img src="/img/feather-info.png"  class="info" /> */}
                </div>
            </div>
            <div class="rank">
                <div class="your-rank">
                    {
                        seconds > 1 ?
                            <pre>
                                <span className='text-red' >Please Wait</span>
                                {" \n Fetching Your Rank In..."} {seconds} Seconds </pre>
                            : <> <h5>Your Rank</h5>
                                <h4>{data?.user?.rank}</h4></>

                    }

                </div>
                {
                    data?.user?.score ?

                        <div class="score">
                            <div class="score-content">
                                <h5>SCORE: {data?.user?.score}</h5>
                            </div>
                        </div>
                        :

                        <div class="loadingio-spinner-spinner-20aj1y9ioww"><div class="ldio-knc5xoxdun">
                            <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
                        </div></div>
                }

                <div class="prize-main">
                    <table class="table-respo">
                        <thead>
                            <tr>
                                <th>
                                    <h6>Rank</h6>
                                </th>
                                <th>
                                    <h6>Score</h6>
                                </th>
                                <th>
                                    <h6>Prize</h6>
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                data?.leaderboard?.length ?
                                    data?.leaderboard?.map((e) => {
                                        return (
                                            <tr>
                                                <td>
                                                    <div class="tab-imgs">
                                                        <span>{e?.rank}</span>
                                                        <img
                                                            src={e?.user?.photo ?? "/img/thor.png"}
                                                            alt=""
                                                        />
                                                        <span>{e?.user?.username}</span>
                                                    </div>
                                                </td>
                                                <td>
                                                    <span>{e?.score}</span>
                                                </td>
                                                <td class="last-tds">
                                                    <span>₹{e?.prize}</span>
                                                </td>
                                            </tr>
                                        )
                                    }) : ""

                            }

                            {
                                seconds > 1 ? <tr>
                                    <td>
                                        <div className='sldgjlj' >
                                            <lines class="shine l1"></lines>

                                        </div>
                                    </td>
                                    <td>
                                        <div className='sldgjlj' >
                                            <lines class="shine l2"></lines>

                                        </div>
                                    </td>
                                    <td>
                                        <div className='sldgjlj' >
                                            <lines class="shine l3"></lines>

                                        </div>
                                    </td>
                                </tr> : ""
                            }
                            {
                                seconds > 1 ? <tr>
                                    <td>
                                        <div className='sldgjlj' >
                                            <lines class="shine l1"></lines>

                                        </div>
                                    </td>
                                    <td>
                                        <div className='sldgjlj' >
                                            <lines class="shine l2"></lines>

                                        </div>
                                    </td>
                                    <td>
                                        <div className='sldgjlj' >
                                            <lines class="shine l3"></lines>

                                        </div>
                                    </td>
                                </tr> : ""
                            }

                        </tbody>

                    </table>
                </div>
                {
                    data?.group?.id &&
                    <h6 class="id-text">ID: {data?.group?.id}</h6>
                }
                <button type="button" class="btn-start" onClick={handleBack}  >START NEW BATTLE</button>
            </div>
        </div>
    )
}

export default ScoreCard