import { useAtom } from 'jotai'
import moment from 'moment'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import API from '../../api/services/API'
import apiAtom from '../../jotai/apiAtom'

const GrandContestCard = ({ d }) => {
    const router = useRouter();

    const [game, setGame] = useAtom(apiAtom.gameDetail);

    const handleClick = () => {
        let tkn = router?.query?.token;
        let game_id = router?.query?.game_id;

        if (!tkn && !game_id) return;

        router.push(`/hg_games/contests/mega?contest_id=${d?.id}&token=${tkn}&game_id=${game_id}`)

        return;
    }

    const handleJoin = () => {
        let tkn = router?.query?.token;
        let game_id = router?.query?.game_id;
        if (!tkn && !game_id) return;

        API.joinMega({ body: { contest_id: d?.id } }, (_d) => {
            router.push(`/hg_games/contests/mega?contest_id=${d?.id}&token=${tkn}&game_id=${game_id}`)

        }, tkn)
    }

    return (
        <>
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
                            <h5>{`  ₹${`${d?.prize}`.includes('.00') ?
                                parseFloat(d?.prize || "0").toFixed(0) : d?.prize}`}</h5>
                            <p>Make your highest score and win unreal cash<span> rewards T&C Apply!</span></p>
                            <p className='gp-click' onClick={handleClick} >
                                click here to know more
                            </p>


                        </div>
                    </div>
                </div>
                <div className="play-wiin">
                    <div className="play-content">
                        <div className="play-user">
                            <img src="/img/user.png" alt="" />
                            <p>{" "} {d?.total_teams}/{d?.group_teams}  Players</p>
                        </div>
                        <div className="play-user">
                            <img src="/img/1st.png" alt="" className='mon' />
                            <p>{" "} ₹{d?.prize_breakup?.length ? d?.prize_breakup[0]?.prize : ""}  </p>
                        </div>
                        <div className="play-user">
                            <img src="/img/time.png" alt="" className='time' />
                            <p className='mon'>{" "} {moment(d?.starting_at).format('HH:mm A, MMM DD') + " - " + moment(d?.ending_at).format('HH:mm A, MMM DD')}</p>
                        </div>
                    </div>
                    <div className="play-btn">
                        <button onClick={handleJoin} >Play ₹{`${`${d?.entry_fee}`.includes('.00') ? parseFloat(d?.entry_fee || '0').toFixed(0) : d?.entry_fee}`}</button>
                    </div>
                </div>
            </div>
            <br />
        </>
    )
}

export default GrandContestCard