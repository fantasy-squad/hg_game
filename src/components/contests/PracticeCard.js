import React, { useEffect, useState } from 'react'



import API from '../../api/services/API';
import { useRouter } from 'next/router';
import { useAtom } from 'jotai';
import apiAtom from '../../jotai/apiAtom';
import { toast } from 'react-hot-toast';
import FlipNumbers from 'react-flip-numbers';

function PracticeCard({ d }) {

    const router = useRouter()
    const [game, setGame] = useAtom(apiAtom.gameDetail)





    const handleJoin = () => {
        let game_id = router?.query?.game_id;
        let tkn = router?.query?.token;

        if (!game_id || !tkn || !game?.url) return;
        router.push(`${game?.url}?user_id=${0}&group_id=${0}&contest_id=${0}&token=${tkn}&game_id=${game_id}&type=practice`);

    }

    return (
        <>
            <div className='contest-card' >
                <div className="affliliate-card">
                    <div className="heading haesding2">
                        <div className="battle">
                            <img src="/img/battle.png" />
                            <h5>Practice</h5>
                        </div>
                        <div className="fee">
                            {/* <p>Entry Fee</p> */}
                        </div>
                    </div>
                    <div className="heading">
                        <div className="part">
                            <h5>
                                {
                                    "Practice"
                                }
                            </h5>
                        </div>
                        <p className='ccrd-time' >

                        </p>
                        <div className="free">
                            <button onClick={handleJoin} >{
                                "PRACTICE"
                            }</button>
                        </div>
                    </div>
                    <div className="user">
                        <div className="pp">
                            <h5 style={{ fontSize: "14px" }} >{1}P</h5>
                        </div>

                        {/* <div className="user-id">

                            <div className="awad">
                                <img src="/img/user.png" width={20} />

                            </div>

                            <div className="awad">
                                <img src="/img/winning.jpeg" width={15} />
                                <h6> ₹ {d?.prize} </h6>
                            </div>
                            <div className="awad">
                                <img src="/img/award.png"  />
                                <h6>1</h6>
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>
            <br />
        </>
    )
}

export default PracticeCard