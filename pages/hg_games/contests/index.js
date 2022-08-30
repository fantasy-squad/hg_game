import { useAtom } from 'jotai';
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast';
import API from '../../../src/api/services/API';
import apiAtom from '../../../src/jotai/apiAtom';
import moment from 'moment-timezone';
import Countdown from 'react-countdown';
import ContestCard from '../../../src/components/contests/ContestCard';
import GlobalModal from '../../../src/components/Modal/GloabModal';
import FindMyGroupModal from '../../../src/components/contests/FindMyGroupModal';


function Contests() {

    const router = useRouter();
    const [list, setContestList] = useAtom(apiAtom.contestList);
    const [game, setGame] = useAtom(apiAtom.gameDetail)



    useEffect(() => {

        if (!router.isReady) return;

        let tkn = router?.query?.token;
        let game_id = router?.query?.game_id;


        if (!tkn || !game_id) return;

        API.contestList({ params: { game_id: game_id } }, (d) => {


        }, tkn);

        API.gameDetail({ id: game_id }, (d) => {

        }, tkn)





    }, [router.isReady]);

    return (
        <>



            <div className="mobileview">
                <div className="mobile-header">
                    <i className="fa-solid fa-arrow-left" />
                    <img src={game?.image || "/img/knif.png"} alt="#" className="knif" />
                    <h6 className="mx-auto">{game?.name || "Knife Hit"}</h6>
                    <img src="/img/wallet.png" alt="#" className="wallet" style={{ opacity: 0 }} />
                </div>

                <div className="mobile-main">
                    <div className="affiliate-main">
                        {
                            list.length ?
                                list.map((d) => {
                                    return (

                                        <ContestCard d={d} key={d?.id} />

                                    );
                                }) : ""
                        }

                        <FindMyGroupModal />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Contests