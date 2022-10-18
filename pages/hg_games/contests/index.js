import { useAtom, useAtomValue } from 'jotai';
import { useRouter } from 'next/router'
import React, { useEffect, useRef, useState } from 'react'
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
import GrandContestCard from '../../../src/components/contests/GrandContestCard';
import useDetectKeyboardOpen from 'use-detect-keyboard-open';
import MegaHistoryCard from '../../../src/components/contests/MegaHistoryCard';



function Contests() {
    const isKeyboardOpen = useDetectKeyboardOpen();
    const [attempt, setAttempt] = useState(0)
    const [new_msg, setNewMsg] = useState(null)

    useEffect(() => {
        if (attempt < 1) {
            if (isKeyboardOpen) {
                // toast("Full Screen Mode ")
                setAttempt(p => p + 1)
            }
        }
    }, [isKeyboardOpen])


    const router = useRouter();
    const [list, setContestList] = useAtom(apiAtom.contestList);
    const [history, setHistory] = useAtom(apiAtom.historyList)
    const [game, setGame] = useAtom(apiAtom.gameDetail)
    const [tab, setTab] = useState("battle") // battle || history
    const user = useAtomValue(apiAtom.user)
    const [chat, setChat] = useState([]);
    const [msg, setMsg] = useState('')
    const [typing, setType] = useState(null);

    const [show, setShow] = useState(false)

    const [loading, setLoading] = useState(true)

    const bottomRef = useRef(null);




    useEffect(() => {

        if (!router.isReady) return;

        let tkn = router?.query?.token;
        let game_id = router?.query?.game_id;
        let is_mini = router?.query?.type == "mini";

        API.gameDetail({ id: game_id }, (d) => {
            API.Socket(s => {
                s.emit('join-chat', { game_id: "1" })
            })
        }, tkn);

        if (is_mini) {
            setLoading(false)
            return;
        };


        if (!tkn || !game_id) return;

        API.contestList({ params: { game_id: game_id } }, (d) => {
            setLoading(false)

        }, tkn);



        API.me({}, (d) => {

        }, tkn);



        API.Socket(s => {
            s.on('receive-chat', (d) => {
                scrollToBottom()
                setChat(p => [...p, d])
                setNewMsg(d)
                setTimeout(() => {
                    setNewMsg(null)

                }, 2000)
            })

            s.on('user-typing', (d) => {
                scrollToBottom()
                setType(d)

            })


            s.on('user-no-longer-typing', (d) => {
                scrollToBottom()
                setType(null)

            })

        })



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

    const sendChat = (e) => {
        e?.preventDefault();
        if (!msg) {
            return;
        }
        scrollToBottom()
        API.Socket(s => {
            let chat_data = {
                game_id: "1",
                chat: msg || "Hello test chat",
                user: {
                    id: user?.id,
                    photo: user?.photo,
                    name: user?.username,
                    role: user?.role,
                }
            }
            s.emit('user-stopped', chat_data)
            s.emit('send-chat', chat_data)
            setChat(p => [...p, { ...chat_data, mine: true }])
            setMsg('')
        })
    }

    useEffect(() => {
        let timer;
        if (!msg) {
            timer = setTimeout(userNoLongertyping, 2000);
            return;
        }


        API.Socket(s => {

            let chat_data = {
                game_id: "1",
                user: {
                    id: user?.id,
                    photo: user?.photo,
                    name: user?.username,
                    role: user?.role,
                }
            }
            scrollToBottom()
            s.emit('user-typed', chat_data)




        });

        timer = setTimeout(userNoLongertyping, 1000);
        return () => {
            clearTimeout(timer)

        }

    }, [msg])

    const userNoLongertyping = () => {
        API.Socket(s => {
            scrollToBottom()
            s.emit('user-stopped', {
                game_id: "1",
                user: {
                    id: user?.id,
                    photo: user?.photo,
                    name: user?.username,
                    role: user?.role,
                }
            })

        })
    }
    const handleBack = () => {
        window.close();
    }

    const scrollToBottom = () => {
        bottomRef?.current?.scrollIntoView({ behavior: 'smooth' });

    }

    return (
        <>



            <div className="mobileview">
                <div className="mobile-header">
                    {/* <div className="left-arrow" onClick={handleBack} >
                        <img src="/img/left-arrow.png" alt="" />
                    </div> */}
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
                {
                    show ?

                        <div class={`chat-main ${isKeyboardOpen ? "keyboard-chat-main" : ""} `}>
                            <ol class="chat">
                                <div class="menu">
                                    <div class="back2">
                                        <img src={game?.image || ""} draggable="false" />
                                        <h5>{game?.name}</h5>
                                    </div>
                                </div>
                                <div class="chats">
                                    {
                                        chat?.length ?
                                            chat?.map((c, i) => {
                                                return (
                                                    <li class={c?.mine ? "self" : "other"} ref={i == (chat?.length - 1) ? bottomRef : null} >
                                                        <div class="avatar">
                                                            <img src={c?.user?.photo || "https://i.imgur.com/HYcn9xO.png"} draggable="false" />
                                                        </div>
                                                        <div class="msg">
                                                            <h6>{c?.user?.name}</h6>
                                                            <p >{c?.chat}</p>
                                                        </div>
                                                    </li>
                                                )
                                            })
                                            : ""
                                    }

                                    {
                                        typing ?
                                            <li class={"other"}>
                                                <div class="avatar">
                                                    <img src={typing?.user?.photo || "https://i.imgur.com/HYcn9xO.png"} draggable="false" />
                                                </div>
                                                <div class="msg">
                                                    <h6>{typing?.user?.name}</h6>
                                                    <div class="chat-bubble">
                                                        <div class="typing">
                                                            <div class="dot"></div>
                                                            <div class="dot"></div>
                                                            <div class="dot"></div>
                                                        </div>
                                                    </div>

                                                </div>
                                            </li>
                                            : ""
                                    }

                                    <div ref={bottomRef} />




                                </div>
                            </ol>
                            <form onSubmit={sendChat} >
                                <input class="textarea" type={"text"} placeholder="Write a Massage" value={msg} onChange={(e) => setMsg(e.target.value)} />
                            </form>
                        </div>
                        : <></>
                }

                {
                    (new_msg && !show) ?

                        <div className='msg-icon-info-label' >
                            <p>{new_msg?.chat}</p>
                        </div>
                        : <></>
                }
                {/* <div class="msg-icon" onClick={() => setShow(p => !p)} >


                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 800 800"
                        height="32px"
                        width="32px"
                        role="img"
                        alt="Chat icon"
                        class="tawk-min-chat-icon">
                        <path
                            fill="#fff"
                            clip-rule="evenodd"
                            d="M400 26.2c-193.3 0-350 156.7-350 350 0 136.2 77.9 254.3 191.5 312.1 15.4 8.1 31.4 15.1 48.1 20.8l-16.5 63.5c-2 7.8 5.4 14.7 13 12.1l229.8-77.6c14.6-5.3 28.8-11.6 42.4-18.7C672 630.6 750 512.5 750 376.2c0-193.3-156.7-350-350-350zm211.1 510.7c-10.8 26.5-41.9 77.2-121.5 77.2-79.9 0-110.9-51-121.6-77.4-2.8-6.8 5-13.4 13.8-11.8 76.2 13.7 147.7 13 215.3.3 8.9-1.8 16.8 4.8 14 11.7z"
                        ></path>
                    </svg>
                </div> */}

                <div className="mobile-main">
                    <div className="affiliate-main">
                        {/* {tab == "battle" ? <PracticeCard /> : <></>} */}

                        {/* <div className="grand-contest">
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
                                    <button>Play ₹1</button>
                                </div>
                            </div>
                        </div>
                        <br /> */}

                        {
                            tab == "battle" ?
                                (list.length ?
                                    list.map((d, i) => {
                                        if (d?.is_mega && i == 0) {
                                            return <>
                                                <GrandContestCard d={d} key={d?.id} text="Click here to know more" />
                                                <PracticeCard />
                                            </>
                                        }
                                        return (

                                            (!d?.is_mega && i == 0) ?
                                                <>
                                                    <PracticeCard />
                                                    <ContestCard d={d} key={d?.id} />
                                                </>
                                                : <>
                                                    <ContestCard d={d} key={d?.id} />
                                                </>




                                        );
                                    }) : loading ? [1, 2, 3, 4].map((d) => {
                                        return (
                                            <>
                                                <div className='contest-card ' >
                                                    <div className="affliliate-card shimmer">
                                                        <div className="heading haesding2">
                                                            <div className="battle">
                                                                {/* <img src="/img/battle.png" /> */}
                                                                <br />
                                                                <br />

                                                                <h5></h5>
                                                            </div>
                                                            <div className="fee">
                                                                {/* <p>Entry Fee</p> */}
                                                            </div>
                                                        </div>
                                                        <div className="heading">
                                                            <div className="part">
                                                                <h5>
                                                                    {
                                                                        ""
                                                                    }
                                                                </h5>
                                                            </div>
                                                            <p className='ccrd-time' >

                                                            </p>
                                                            <div className="free">
                                                                <button style={{ opacity: 0 }}  >{
                                                                    ""
                                                                }</button>
                                                            </div>
                                                        </div>
                                                        <div className="user">
                                                            <div className="pp">
                                                                {/* <h5 style={{ fontSize: "14px" }} ></h5> */}
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
                                    }) : <PracticeCard />) : tab == "history" ?
                                    (
                                        history.length ?
                                            history.map((d, i) => {
                                                if (d?.mega) {
                                                    return <MegaHistoryCard d={d} key={d?.id} i={i} />
                                                }
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