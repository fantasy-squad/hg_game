import React from 'react'

function HistoryCard() {
    return (
        <>
            <div className="history-content">
                <div className="history-main">
                    <div className="battle-main">
                        <div className="battle">
                            <img src="/img/battle.png" alt="" />
                            <h6>Battle</h6>
                        </div>
                        <div className="entry-fee">
                            <h6>Entry Fee: <span>₹2</span> </h6>
                        </div>
                    </div>
                    <div className="won">
                        <div className="won-person">
                            <h6>VS</h6>
                            <img src="/img/tony.png" alt="" />
                            <h5>TONYSTARK</h5>
                        </div>
                        <div className="won-money">
                            <h5>₹10</h5>
                            <h6>WON</h6>
                        </div>
                    </div>
                    <hr className='hr' />
                    <div className="date-time">
                        <div className="date">
                            <h6>Jul 24, 11:24 AM</h6>
                        </div>
                        <div className="id">
                            <h6>ID: <span>65ASDSA6D6ASD66</span></h6>
                        </div>
                    </div>
                </div>
                <div class="prize-main history-ranks">
                    <table class="table-respo">
                        <tbody>
                            <tr>
                                <td>
                                    <div class="numbering">
                                        <h6>1</h6>
                                    </div>
                                </td>
                                <td>
                                    <div class="tab-imgs">
                                        <img src="/img/thor.png" alt="" className='history-dp' />
                                    </div>
                                </td>
                                <td>
                                    <div class="history-id">
                                        <h6>1555####545##</h6>
                                    </div>
                                </td>
                                <td>
                                    <div class="history-score">
                                        <h6>150</h6>
                                    </div>
                                </td>
                                <td>
                                    <div class="history-prize">
                                        <h6>₹3.5</h6>
                                    </div>
                                </td>
                            </tr>

                            <tr>
                                <td>
                                    <div class="numbering">
                                        <h6>1</h6>
                                    </div>
                                </td>
                                <td>
                                    <div class="tab-imgs">
                                        <img src="/img/thor.png" alt="" className='history-dp' />
                                    </div>
                                </td>
                                <td>
                                    <div class="history-id">
                                        <h6>1555####545##</h6>
                                    </div>
                                </td>
                                <td>
                                    <div class="history-score">
                                        <h6>150</h6>
                                    </div>
                                </td>
                                <td>
                                    <div class="history-prize">
                                        <h6>₹3.5</h6>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                </div>
            </div>
        </>
    )
}

export default HistoryCard