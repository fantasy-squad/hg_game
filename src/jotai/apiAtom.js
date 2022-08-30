import { atom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

export default {

    contestList: atom([]),
    myGroup: atom({}),
    myScore: atom({}),
    socket: atom(null),
    gameDetail: atom({}),
    modal: {
        findMyGroup: atom(false)
    }

}