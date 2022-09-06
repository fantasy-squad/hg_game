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
import HistoryCard from '../../../src/components/contests/HistoryCard';
import PracticeCard from '../../../src/components/contests/PracticeCard';


function Contests() {

    const router = useRouter();
    const [list, setContestList] = useAtom(apiAtom.contestList);
    const [history, setHistory] = useAtom(apiAtom.historyList)
    const [game, setGame] = useAtom(apiAtom.gameDetail)
    const [tab, setTab] = useState("battle") // battle || history



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

    const handlTab = (t) => () => {

        if (t == tab) {
            return;
        }
        setTab(t);

        let tkn = router?.query?.token;
        let game_id = router?.query?.game_id;


        if (!tkn || !game_id) return;

        if (t == "battle") {
            API.contestList({ params: { game_id: game_id } }, (d) => {


            }, tkn);
        } else if (t == "history") {
            API.myHistory({ params: { game_id: game_id } }, (d) => {


            }, tkn);
        }


    }

    return (
        <>



            <div className="mobileview">
                <div className="mobile-header">
                    <i className="fa-solid fa-arrow-left" />
                    {
                        game?.image
                            ?
                            <img src={game?.image || ""} className="knif" />
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
                    <img src="/img/wallet.png" className="wallet" style={{ opacity: 0 }} />
                </div>

                <div className="mobile-main">
                    <div className="affiliate-main">
                        {tab == "battle" ? <PracticeCard /> : <></>}

                        {
                            tab == "battle" ?
                                (list.length ?
                                    list.map((d) => {
                                        return (

                                            <ContestCard d={d} key={d?.id} />



                                        );
                                    }) : "") : tab == "history" ?
                                    (
                                        history.length ?
                                            history.map((d, i) => {
                                                return (

                                                    <HistoryCard d={d} key={d?.id} i={i} />



                                                );
                                            }) : ""
                                    ) : ""
                        }
                        <br />
                        <br />
                        <br />
                        <br />

                        <FindMyGroupModal />
                    </div>
                </div>
                <div className="contest-fab">
                    <button className={tab == "battle" ? 'cf-active' : ""} onClick={handlTab('battle')} >
                        <svg id="sword_battle_icon_206195" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
                            <path id="Path_24705" data-name="Path 24705" d="M0,0H20V20H0Z" fill="none" />
                            <path id="Path_24706" data-name="Path 24706" d="M6.284,11.672l2.945,2.947L8.051,15.8l1.179,1.179L8.052,18.154,5.99,16.092,3.632,18.449,2.454,17.271l2.358-2.358L2.749,12.851l1.178-1.178L5.106,12.85l1.178-1.178ZM2.909,3,5.864,3l9.848,9.848,1.179-1.178,1.178,1.178-2.062,2.063,2.357,2.357-1.178,1.178-2.358-2.358-2.063,2.063-1.178-1.178L12.766,15.8,2.911,5.943ZM14.957,3l2.953,0,0,2.936L14.533,9.315,11.587,6.369Z" transform="translate(-0.409 -0.5)" fill="#636363" className='cf-activation' />
                        </svg>

                        <p>Battle</p>
                    </button>
                    <button className={tab == "history" ? 'cf-active' : ""} onClick={handlTab('history')} >
                        <svg xmlns="http://www.w3.org/2000/svg" width="19.371" height="16.604" viewBox="0 0 19.371 16.604">
                            <path id="Icon_material-history" data-name="Icon material-history" d="M12.569,4.5a8.3,8.3,0,0,0-8.3,8.3H1.5L5.088,16.39l.065.129L8.879,12.8H6.112a6.488,6.488,0,1,1,1.9,4.557L6.7,18.669A8.3,8.3,0,1,0,12.569,4.5Zm-.922,4.612v4.612l3.948,2.343.664-1.116L13.03,13.033V9.112Z" transform="translate(-1.5 -4.5)" fill="#636363" className='cf-activation' />
                        </svg>

                        <p>History</p>
                    </button>
                </div>
            </div>
        </>
    )
}

export default Contests