import { useAtom } from 'jotai';
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import API from '../../../src/api/services/API';
import apiAtom from '../../../src/jotai/apiAtom';
import { useWindowSize } from 'react-use';
import Confetti from 'react-confetti'




function ScoreCard() {

    const router = useRouter();
    const [seconds, setSeconds] = useState(30);
    const [data, setData] = useAtom(apiAtom.myMegaScore)
    const [game, setGame] = useAtom(apiAtom.gameDetail)
    const [isLoading, setIsLoading] = useState(true)

    const { width, height } = useWindowSize()




    useEffect(() => {
        if (!router.isReady) return;

        let tkn = router?.query?.token;
        let user_id = router?.query?.user_id;
        let contest_id = router?.query?.contest_id;
        let group_id = router?.query?.group_id;
        let game_id = router?.query?.game_id;

        API.Socket((s) => {

        });

        if (game_id && tkn) {


            API.gameDetail({ id: game_id }, (d) => {

            }, tkn)
        }




        if (!tkn || !user_id || !game_id || !contest_id) return;


        API.getMegaScore({
            body: {
                contest_id,
                user_id,
                game_id,
            }
        }, (d) => {
            setIsLoading(false);
        }, tkn, () => {
            API.getMegaScore({
                body: {
                    contest_id,
                    user_id,
                    game_id,
                }
            }, (d) => {
                setIsLoading(false);

            }, tkn, () => {
                API.getMegaScore({
                    body: {
                        contest_id,
                        user_id,
                        game_id,
                    }
                }, (d) => {
                    setIsLoading(false);

                }, tkn, () => {

                })
            })
        })


    }, [router.isReady]);

    const handleBack = () => {
        let tkn = router?.query?.token;
        let user_id = router?.query?.user_id;
        let contest_id = router?.query?.contest_id;
        let group_id = router?.query?.group_id;
        let game_id = router?.query?.game_id;


        if (isLoading) {
            return;
        }




        if (game_id) {



            router.push(`/hg_games/contests?user_id=${user_id}&token=${tkn}&game_id=${game_id}`)
        }

    }




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
                        isLoading ?
                            <pre>
                                <span className='text-red'>Please Wait.</span>
                                {" \n Fetching Your Rank..."}  </pre>
                            : <> <h5>Your Rank</h5>
                                <h4>{data?.rank}</h4></>

                    }

                </div>
                {
                    !isLoading ?

                        <div class="score">
                            <div class="score-content">
                                <h5>SCORE: {data?.total_points}</h5>
                            </div>
                        </div>
                        :

                        <div class="loadingio-spinner-spinner-20aj1y9ioww"><div class="ldio-knc5xoxdun">
                            <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
                        </div></div>
                }

                <div class="prize-main">
                    {
                        parseInt(data?.rank) > 1 ?
                            <p style={{ color: 'white' }} >Play again to add more score to win the 1<small>st</small> prize. </p> : parseInt(data?.rank) == 1 ? <p style={{ color: 'white' }} >Congratulations 🏆 you are the First Ranker 🥳 </p>
                                : <></>
                    }
                </div>
                {
                    parseInt(data?.rank) == 1 ?
                        <Confetti
                            width={width}
                            height={height}
                        />
                        : <></>
                }

                <button type="button" class="btn-start" onClick={handleBack}  >START NEW BATTLE</button>
            </div>
        </div>
    )
}

export default ScoreCard