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
    contestDetail: atom({}),
    megaLeaderboard: atom({}),
    megaLeaderboardRanks: atom([]),
    megaLeaderboardOpt: atom({
        page: 0,
        limit: 10,
        current_page: 0,
        total_count: 0,
        total_pages: 0,
    }),

    modal: {
        findMyGroup: atom(false)
    }

}