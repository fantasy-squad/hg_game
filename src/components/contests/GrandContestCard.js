import moment from 'moment'
import React from 'react'

const GrandContestCard = ({ d }) => {
    return (
        <>
            <div className="grand-contest">
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
                            <h5>₹{(d?.prize)}</h5>
                            <p>Make your highest score and win unreal cash<span> rewards T&C Apply!</span></p>
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
                            <p>{" "} ₹80  </p>
                        </div>
                        <div className="play-user">
                            <img src="/img/time.png" alt="" className='time' />
                            <p className='mon'>{" "} {moment(d?.starting_at).format('HH:mm A, MMM DD') - moment(d?.ending_at).format('HH:mm A, MMM DD')}</p>
                        </div>
                    </div>
                    <div className="play-btn">
                        <button>Play ₹{d?.entry_fee}</button>
                    </div>
                </div>
            </div>
            <br />
        </>
    )
}

export default GrandContestCard