import { atom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

export default {
    user: atomWithStorage("user", null),
    contestList: atom([]),
    historyList: atom([]),
    myGroup: atom({}),
    myScore: atom({}),
    socket: atom(null),
    gameDetail: atom({}),
    modal: {
        findMyGroup: atom(false)
    }

}