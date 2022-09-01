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


    return (
        <>



            <div className="mobileview">
            <div className="mobile-header">
                    <img src="/img/back-button.svg" alt="" className='back' />
                    <img src="/img/knif.png" alt="#" className="knif" />
                    <h6 className="mx-auto">Knife Hit</h6>
                    <img src="/img/wallet.png" alt="#" className="wallet" />
                </div>
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
                                <img src="/img/thor.png"alt="" className='history-dp' />
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
                    <hr  className='history'/>
                    <table class="table-respo">
                        <tbody>
                          <tr>
                          <td>
                            <div class="numbering">
                                <h6>2   </h6>
                             </div>
                            </td>
                            <td>
                              <div class="tab-imgs">
                                <img src="/img/thor.png"alt="" className='history-dp' />
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

export default Contests