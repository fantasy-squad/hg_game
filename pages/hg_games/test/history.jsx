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
                <HistoryCard />
                <HistoryCard />
                <HistoryCard />
                <HistoryCard />
                <HistoryCard />
                <HistoryCard />


                <div className="contest-fab">
                    <button className='cf-active' >
                        <svg id="sword_battle_icon_206195" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
                            <path id="Path_24705" data-name="Path 24705" d="M0,0H20V20H0Z" fill="none" />
                            <path id="Path_24706" data-name="Path 24706" d="M6.284,11.672l2.945,2.947L8.051,15.8l1.179,1.179L8.052,18.154,5.99,16.092,3.632,18.449,2.454,17.271l2.358-2.358L2.749,12.851l1.178-1.178L5.106,12.85l1.178-1.178ZM2.909,3,5.864,3l9.848,9.848,1.179-1.178,1.178,1.178-2.062,2.063,2.357,2.357-1.178,1.178-2.358-2.358-2.063,2.063-1.178-1.178L12.766,15.8,2.911,5.943ZM14.957,3l2.953,0,0,2.936L14.533,9.315,11.587,6.369Z" transform="translate(-0.409 -0.5)" fill="#636363" className='cf-activation' />
                        </svg>

                        <p>Battle</p>
                    </button>
                    <button>
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