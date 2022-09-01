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
            </div>
        </>
    )
}

export default Contests