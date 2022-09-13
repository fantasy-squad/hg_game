import React, { useEffect, useState } from 'react'
import FlipNumbers from 'react-flip-numbers';

function HgGames() {

    const [count, setCount] = useState("0")

    useEffect(() => {
        setInterval(() => {
            setCount(p => `${parseInt(p) + 1}`)
        }, 1000);
    }, [])

    return (
        <div className="mobileview">
            <div className="mobile-header">
                <i className="fa-solid fa-arrow-left" />
                <img src="https://imgs2.dab3games.com/knife-ninja-video.jpg" className="knif" />
                <h6 className="mx-auto">knif hit</h6>
                <img src="/img/wallet.png" className="wallet" />
            </div>
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
                            <img src="/img/1st.png" alt="" className='mon'   />
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
            <div className="mobile-main">
                <div className="affiliate-main">
                    <div className="affliliate-card">
                        <div className="heading haesding2">
                            <div className="battle">
                                <img src="/img/battle.png" />
                                <h5>Battle</h5>
                            </div>
                            <div className="fee">
                                <h6>Entry Fee</h6>
                            </div>
                        </div>
                        <div className="heading">
                            <div className="part">
                                <h5>Practice</h5>
                            </div>
                            <div className="free">
                                <button>FREE</button>
                            </div>
                        </div>
                        <div className="user">
                            <div className="pp">
                                <h5>1P</h5>
                            </div>
                            <div className="user-id">
                                <i className="fa-solid fa-user" />
                                <FlipNumbers height={16} width={16} numberStyle={{ fontWeight: "bold" }} perspective={1000} color="black" background="white" play numbers={count} />
                                <div className="awad">
                                    <img src="/img/award.png" />
                                    <h6>1</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="affliliate-card">
                        <div className="heading haesding2">
                            <div className="battle">
                                <img src="/img/battle.png" />
                                <h5>Battle</h5>
                            </div>
                            <div className="fee">
                                <h6>Entry Fee</h6>
                            </div>
                        </div>
                        <div className="heading">
                            <div className="part">
                                <h5>Practice</h5>
                            </div>
                            <div className="free">
                                <button>FREE</button>
                            </div>
                        </div>
                        <div className="user">
                            <div className="pp">
                                <h5>1P</h5>
                            </div>
                            <div className="user-id">
                                <i className="fa-solid fa-user" />
                                <h6>20</h6>
                                <div className="awad">
                                    <img src="/img/award.png" />
                                    <h6>1</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="affliliate-card">
                        <div className="heading haesding2">
                            <div className="battle">
                                <img src="/img/battle.png" />
                                <h5>Battle</h5>
                            </div>
                            <div className="fee">
                                <h6>Entry Fee</h6>
                            </div>
                        </div>
                        <div className="heading">
                            <div className="part">
                                <h5>Practice</h5>
                            </div>
                            <div className="free">
                                <button>FREE</button>
                            </div>
                        </div>
                        <div className="user">
                            <div className="pp">
                                <h5>1P</h5>
                            </div>
                            <div className="user-id">
                                <i className="fa-solid fa-user" />
                                <h6>20</h6>
                                <div className="awad">
                                    <img src="/img/award.png" />
                                    <h6>1</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="affliliate-card">
                        <div className="heading haesding2">
                            <div className="battle">
                                <img src="/img/battle.png" />
                                <h5>Battle</h5>
                            </div>
                            <div className="fee">
                                <h6>Entry Fee</h6>
                            </div>
                        </div>
                        <div className="heading">
                            <div className="part">
                                <h5>Practice</h5>
                            </div>
                            <div className="free">
                                <button>FREE</button>
                            </div>
                        </div>
                        <div className="user">
                            <div className="pp">
                                <h5>1P</h5>
                            </div>
                            <div className="user-id">
                                <i className="fa-solid fa-user" />
                                <h6>20</h6>
                                <div className="awad">
                                    <img src="/img/award.png" />
                                    <h6>1</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="affliliate-card">
                        <div className="heading haesding2">
                            <div className="battle">
                                <img src="/img/battle.png" />
                                <h5>Battle</h5>
                            </div>
                            <div className="fee">
                                <h6>Entry Fee</h6>
                            </div>
                        </div>
                        <div className="heading">
                            <div className="part">
                                <h5>Practice</h5>
                            </div>
                            <div className="free">
                                <button>FREE</button>
                            </div>
                        </div>
                        <div className="user">
                            <div className="pp">
                                <h5>1P</h5>
                            </div>
                            <div className="user-id">
                                <i className="fa-solid fa-user" />
                                <h6>20</h6>
                                <div className="awad">
                                    <img src="/img/award.png" />
                                    <h6>1</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="affliliate-card">
                        <div className="heading haesding2">
                            <div className="battle">
                                <img src="/img/battle.png" />
                                <h5>Battle</h5>
                            </div>
                            <div className="fee">
                                <h6>Entry Fee</h6>
                            </div>
                        </div>
                        <div className="heading">
                            <div className="part">
                                <h5>Practice</h5>
                            </div>
                            <div className="free">
                                <button>FREE</button>
                            </div>
                        </div>
                        <div className="user">
                            <div className="pp">
                                <h5>1P</h5>
                            </div>
                            <div className="user-id">
                                <i className="fa-solid fa-user" />
                                <h6>20</h6>
                                <div className="awad">
                                    <img src="/img/award.png" />
                                    <h6>1</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default HgGames