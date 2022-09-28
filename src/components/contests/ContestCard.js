import React, { useEffect, useRef, useState } from 'react'



import API from '../../api/services/API';
import { useRouter } from 'next/router';
import { useAtom } from 'jotai';
import apiAtom from '../../jotai/apiAtom';
import { toast } from 'react-hot-toast';
import FlipNumbers from 'react-flip-numbers';

function ContestCard({ d }) {

    const router = useRouter();
    let [joined, setJoined] = useState(d?.total_teams)
    const [game, setGame] = useAtom(apiAtom.gameDetail)

    const [open, setOpen] = useAtom(apiAtom.modal.findMyGroup)
    const [isComplete, setIsComplete] = useState(false)
    // const [timer, setTimer] = useState(0)
    const [time, setTime] = useState(null)
    const [seconds, setSeconds] = useState(d?.duration + 3 || 10);
    const [list, setContestList] = useAtom(apiAtom.contestList);

    const [animate, setAnimate] = useState(false);
    const ref = useRef(null);




    useEffect(() => {
        // startTimer()

        let timer;
        if (seconds > 0) {
            timer = setInterval(() => {
                clearInterval(timer);

                if (seconds > 1) {
                    setSeconds(p => p - 1);

                } else {

                    let tkn = router?.query?.token;
                    if (!tkn) return;


                    if (d?.has_joined > 0) {
                        API.findMyGroup({ body: { contest_id: d?.id } }, (c) => {
                            setOpen(true);
                            if (!game?.url) {
                                setOpen(false);
                                return;
                            }
                            // router.push(`http://game.fantasysquad.in/game/knife_ninja?user_id=${c?.user?.user_id}&group_id=${c?.group?.id}&contest_id=${c?.contest?.id}&token=${tkn}`);
                            router.push(`${game?.url}?user_id=${c?.user?.user_id}&group_id=${c?.group?.id}&contest_id=${c?.contest?.id}&token=${tkn}&game_id=${d?.hg_game_id}`);

                            // user_id=8a88bce9-9b40-410c-a22d-0d0cb7df170b&group_id=466&contest_id=457&token=8a88bce9-9b40-410c-a22d-0d0cb7df170b|hmW1iDtLXcxL8e1zGxp5XxPaQOed4WTJIYcsT8oJVMKrLgAiQ3&score=540
                        }, tkn, () => {

                            API.contestList({ params: { game_id: d?.hg_game_id } }, (d) => {
                            }, tkn);
                        })

                    } else {
                        let has_joined = list?.filter(f => f?.has_joined > 0);

                        if (has_joined.length > 0) {

                            if (ref.current) {
                                ref.current.style.position = "relative";
                                ref.current.style.width = "100%";
                                ref.current.style.boxShadow = "rgba(0, 0, 0, 0.35) 0px 5px 15px";
                                ref.current.style.transition = "1s";
                                ref.current.style.transform = "translate(100%, 0px)";

                                setTimeout(() => {
                                    setAnimate(true)
                                    if (ref.current) {
                                        ref.current.style.display = "none";
                                    }
                                }, 1000);
                            }
                            return;
                        }

                        API.contestList({ params: { game_id: d?.hg_game_id } }, (d) => {


                        }, tkn);

                    }
                }
            }, 1000);

        } else if (seconds == 0) {
            clearInterval(timer);

            // console.log("contest started")
            // let tkn = router?.query?.token;
            // if (!tkn) return;


            // if (d?.has_joined > 0) {
            //     API.findMyGroup({ body: { contest_id: d?.id } }, (c) => {
            //         setOpen(true);
            //     }, tkn)


            // } else {
            //     API.contestList({ params: { game_id: d?.hg_game_id } }, (d) => {


            //     }, tkn);

            // }
        } else {
            clearInterval(timer);
        }
        return () => {
            clearInterval(timer);

        }

    }, [seconds]);

    useEffect(() => {
        API.Socket((s) => {
            s.on("new-user-joined", (data) => {
                // toast.success(`new user joined ${data.contest_id} ${d?.id} `)

                if (data.contest_id == d?.id) {
                    setJoined(p => p + 1);
                }
            })
        })
    }, [])


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
        if (hours > 0) {
            return `Starting in ${hours}h:${minutes}m:${seconds}s`;
        } else if (minutes > 0) {
            return `Starting in ${minutes}m:${seconds}s`;
        } else if (seconds > 0) {
            if (seconds <= 1) {
                return ''
            }
            return `Starting in ${seconds}s`;
        } else {
            return ''
        }
    }





    const renderer = ({ hours, minutes, seconds, completed }) => {
        if (completed) {
            setIsComplete(true)
            return <></>;
        } else {
            // Render a countdown
            return <span>Starting in {hours}h:{minutes}m:{seconds}s</span>;
        }
    };

    const handleJoin = () => {
        let tkn = router?.query?.token;
        if (!tkn) return;

        API.joinContest({ body: { contest_id: d?.id } }, (_d) => {
            API.Socket((s) => {
                s.emit("contest-joined", { contest_id: d?.id })
            });
            API.contestList({ params: { game_id: d?.hg_game_id } }, (d) => {


            }, tkn)
        }, tkn)
    }

    return (
        <>
            <div className={`contest-card`} ref={ref} >
                <div className="affliliate-card">
                    <div className="heading haesding2">
                        <div className="battle">
                            <img src="/img/battle.png" />
                            <h5>Battle</h5>
                        </div>
                        <div className="fee">
                            <p>Entry Fee</p>
                        </div>
                    </div>
                    <div className="heading">
                        <div className="part">
                            <h5>

                                {
                                    d?.type == "PAID" || d?.type == "FREE" ?
                                        `WIN ₹${`${d?.prize}`.includes('.00') ?
                                            parseFloat(d?.prize || "0").toFixed(0) : d?.prize}` : d?.type
                                }
                            </h5>
                        </div>
                        <p className='ccrd-time' >
                            {secondsToTime(seconds)}
                        </p>
                        <div className="free">
                            <button onClick={handleJoin} >{
                                d?.has_joined > 0 ? "JOINED" : d?.type == "FREE" ? "FREE" : "₹" + `${`${d?.entry_fee}`.includes('.00') ? parseFloat(d?.entry_fee || '0').toFixed(0) : d?.entry_fee}`
                            }</button>
                        </div>
                    </div>
                    <div className="user">
                        <div className="pp">
                            <h5 style={{ fontSize: "14px" }} >{d?.group_teams}P</h5>
                        </div>
                        {
                            parseFloat(d?.bonus || "0") > 0 ?
                                <div className='ccrd-bonus' >
                                    <img src='/img/bonus.jpeg' />
                                    <h6> {`${parseInt(d?.bonus)}% Bonus`} </h6>
                                </div>
                                : ""
                        }
                        <div className="user-id">

                            <div className="awad">
                                <img src="/img/user.png" width={20} />
                                <FlipNumbers height={16} width={10} numberStyle={{ fontWeight: "bold", margin: 0 }} perspective={1000} color="black" background="white" play numbers={`${joined > 0 ? joined : d?.total_teams}`} />
                                <p>{"JOINED"}</p>
                            </div>

                            {/* <div className="awad">
                                <img src="/img/winning.jpeg" width={15} />
                                <h6> ₹ {d?.prize} </h6>
                            </div> */}
                            <div className="awad">
                                <img src="/img/award.png" />
                                <h6>1</h6>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {
                animate ? <></> :
                    <br />
            }
        </>
    )
}

export default ContestCard