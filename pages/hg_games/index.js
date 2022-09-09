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