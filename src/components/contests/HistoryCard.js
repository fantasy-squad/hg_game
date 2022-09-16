import React, { useEffect, useState } from 'react'
import moment from 'moment'

import Collapsible from 'react-collapsible';


function HistoryCard({ d, i }) {

    const [open, setOpen] = useState(false);
    const [text, setText] = useState("")

    useEffect(() => {
        if (d?.member && d?.oponents?.length) {
            let m = d?.member;
            let o = d?.oponents[0];
            if (m?.status == "NOT STARTED" || m?.status == "LIVE") {
                setText("NOT STARTED");
            } else if (m?.status == "CANCELED") {
                setText("CANCELED");
            } else if (m?.rank < o?.rank) {
                setText("WON")
            } else if (m?.rank > o?.rank) {
                setText("LOSE")
            } else if (m?.rank == o?.rank) {
                setText("TIE")
            }

        }
    }, [])

    const handleOpen = () => {
        setOpen(p => !p);
    }



    return (
        <>
            <div className="history-content" onClick={handleOpen}  >
                <div className="history-main">
                    <div className="battle-main">
                        <div className="battle">
                            <img src="/img/battle.png" alt="" />
                            <h6>Battle</h6>
                        </div>
                        <div className="entry-fee">
                            <h6>Entry Fee: <span>₹{d?.contest?.entry_fee}</span> </h6>
                        </div>
                    </div>
                    <div className="won">
                        <div className="won-person">
                            <h6>VS</h6>
                            <img src={(d?.oponents?.length && d?.oponents[0]?.user?.photo) ? d?.oponents[0]?.user?.photo : "/img/tony.png"} alt="" />
                            <h5>{d?.oponents?.length ? d?.oponents[0]?.user?.username : ""}</h5>
                        </div>
                        <div className="won-money">
                            <h5>{parseFloat(d?.member?.prize) > 0 ? `₹${d?.member?.prize}` : ""}</h5>
                            <h6 style={{ color: (text == "LOSE" || text == "CANCELED") ? "red" : "" }} >{
                                text
                            }</h6>
                        </div>
                    </div>
                    <hr className='hr' />
                    <div className="date-time">
                        <div className="date">
                            <h6  >
                                {moment(d?.member?.created_at).format("MMM DD, HH:mm A")}
                            </h6>
                        </div>
                        <div className="id">
                            <h6   >ID: <span>{d?.contest?.id}</span></h6>
                        </div>
                    </div>
                </div>
                {
                    open ?


                        <div class="prize-main history-ranks">
                            <table class="table-respo">
                                <tbody>
                                    {
                                        d?.leaderboard?.length

                                            ?
                                            d?.leaderboard?.sort((a, b) => a?.rank - b?.rank).map((l) => {
                                                return (
                                                    <tr>
                                                        <td>
                                                            <div class="numbering">
                                                                <h6>{l?.rank}</h6>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div class="tab-imgs">
                                                                <img src={l?.user?.photo ? l?.user?.photo : "/img/thor.png"} alt="" className='history-dp' />
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div class="history-id">
                                                                <h6>{l?.user?.username}</h6>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div class="history-score">
                                                                <h6>{l?.score}</h6>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div class="history-prize">
                                                                <h6>₹{l?.prize}</h6>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                )
                                            }) : ""
                                    }

                                </tbody>
                            </table>
                            {
                                moment(moment().format('YYYY-MM-DD HH:mm:ss')).diff(moment(d?.contest?.starting_at).add(d?.contest?.duration), 'minutes') > 0

                                    ?
                                    < div className='hr-btn' >

                                        <button>Fetch Rank</button>
                                    </div>
                                    : ""
                            }
                        </div>
                        : ""}
            </div>
        </>
    )
}

export default HistoryCard