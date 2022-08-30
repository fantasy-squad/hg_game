import { useAtom } from 'jotai'
import React, { useEffect } from 'react'
import apiAtom from '../../jotai/apiAtom'
import GlobalModal from '../Modal/GloabModal'

function FindMyGroupModal() {

  const [open, setOpen] = useAtom(apiAtom.modal.findMyGroup);
  const [group, setgroup] = useAtom(apiAtom.myGroup)



  return (
    <GlobalModal atom={apiAtom.modal.findMyGroup}  >
      <div className="player-main">
        <div className="player">
          <div className="finding">
            <h5>Finding Players</h5>
          </div>
          <div className="win">
            <div className="firstwin">
              <img src="/img/award.png" alt="#" />
              <h6>1st</h6>
            </div>
            <div className="firstwin">
              <img src="/img/money.png " alt="#" />
              <h6>{group?.contest?.prize}</h6>
            </div>
          </div>
          <div className="logo">
            <img src="/img/Logo.png" alt="#" />
          </div>
          <div className="match">
            <div className="thor">
              <img src={group?.user?.user?.photo || "/img/thor.png"} alt="#" />
              <h6>{group?.user?.user?.username || "YOU"}</h6>
            </div>
            <div className="vsss">
              <h6>VS</h6>
            </div>
            <div className="thor">
              <img src={group?.oponents?.length ? (group?.oponents[0]?.user?.photo || "/img/thor.png") : "/img/thor.png"} alt="#" />
              <h6>{group?.oponents?.length ? group?.oponents[0]?.user?.username : "OPPONENT"}</h6>
            </div>
          </div>
          <div className="verifey">
            <img src="/img/v.png" alt="#" />
            <h6>Verified</h6>
          </div>
        </div>
      </div>

      {/* 
    {"status":true,"message":"Contest data with group id.",
    "data"
    :{
      "contest":{"id":453,"hg_game_id":4,"hg_category_id":"1","payment_data":null,"invite_code":"MqFGYBEk","commission":"5.00","group_teams":2,"total_teams":2,"entry_fee":11,"max_team":null,"prize":20,"winner_percentage":null,"is_confirmed":null,"prize_breakup":null,"new_prize_breakup":null,"auto_create_on_full":null,"status":"COMPLETED","type":"PAID","bonus":"3.00","duration":2,"starting_at":"2022-08-30 14:53:28","created_at":"2022-08-30 14:51:28","updated_at":"2022-08-30 14:55:29"},

      "user":{"id":1092,"hg_game_id":4,"user_id":"8a88bce9-9b40-410c-a22d-0d0cb7df170b","hg_contest_id":453,"hg_group_id":"466","status":"LIVE","score":"0.00","rank":0,"prize":"0.00","payment_data":"{\"cash_bonus\":0.33,\"wining_amount\":0,\"deposited_balance\":10.67}","checked":0,"created_at":"2022-08-30 14:53:50","updated_at":null,"user":{"id":"8a88bce9-9b40-410c-a22d-0d0cb7df170b","name":"Arshad Ansari","username":"arsd4244","email":"arsdansari291@gmail.com","photo":"https://fs-new-bucket.s3.amazonaws.com/1650532438564-scaled_5adc77d9-21bf-4ed7-8023-1b3b8dd8fc5f7026940880262583142.jpg"}},
      
      "oponents":[{"id":1093,"hg_game_id":4,"user_id":"1b51e638-4670-4ac5-ba16-a64577ebeb57","hg_contest_id":453,"hg_group_id":"466","status":"LIVE","score":"0.00","rank":0,"prize":"0.00","payment_data":"{\"cash_bonus\":0.33,\"wining_amount\":0,\"deposited_balance\":10.67}","checked":0,"created_at":"2022-08-30 14:54:52","updated_at":null,"user":{"id":"1b51e638-4670-4ac5-ba16-a64577ebeb57","name":"Harshuuu 18","username":"hars2552","email":"harshuuu814@gmail.com","photo":null}}],
      
      "group":{"id":"466"},
      
      "leaderboard":[{"id":1092,"hg_game_id":4,"user_id":"8a88bce9-9b40-410c-a22d-0d0cb7df170b","hg_contest_id":453,"hg_group_id":"466","status":"LIVE","score":"0.00","rank":0,"prize":"0.00","payment_data":"{\"cash_bonus\":0.33,\"wining_amount\":0,\"deposited_balance\":10.67}","checked":0,"created_at":"2022-08-30 14:53:50","updated_at":null,"user":{"id":"8a88bce9-9b40-410c-a22d-0d0cb7df170b","name":"Arshad Ansari","username":"arsd4244","email":"arsdansari291@gmail.com","photo":"https://fs-new-bucket.s3.amazonaws.com/1650532438564-scaled_5adc77d9-21bf-4ed7-8023-1b3b8dd8fc5f7026940880262583142.jpg"}},{"id":1093,"hg_game_id":4,"user_id":"1b51e638-4670-4ac5-ba16-a64577ebeb57","hg_contest_id":453,"hg_group_id":"466","status":"LIVE","score":"0.00","rank":0,"prize":"0.00","payment_data":"{\"cash_bonus\":0.33,\"wining_amount\":0,\"deposited_balance\":10.67}","checked":0,"created_at":"2022-08-30 14:54:52","updated_at":null,"user":{"id":"1b51e638-4670-4ac5-ba16-a64577ebeb57","name":"Harshuuu 18","username":"hars2552","email":"harshuuu814@gmail.com","photo":null}}]
    
    }}
*/}
    </GlobalModal>
  )
}

export default FindMyGroupModal