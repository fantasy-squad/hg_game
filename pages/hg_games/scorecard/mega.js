import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import API from '../../../src/api/services/API'

const mega = () => {
    const router = useRouter()

    useEffect(() => {
        if (!router.isReady) return;

        let tkn = router?.query?.token;
        let user_id = router?.query?.user_id;
        let contest_id = router?.query?.contest_id;
        let group_id = router?.query?.group_id;
        let score = router?.query?.score;
        let game_id = router?.query?.game_id;

        if (!tkn || !user_id || !group_id || !contest_id) return;


        API.getMegaScore({
            body: {
                contest_id,
                user_id,
                group_id,
            }
        }, (d) => {

        }, tkn, () => {
            API.getScore({
                body: {
                    contest_id,
                    user_id,
                    group_id,
                }
            }, (d) => {

            }, tkn, () => {
                API.getScore({
                    body: {
                        contest_id,
                        user_id,
                        group_id,
                    }
                }, (d) => {

                }, tkn, () => {

                })
            })
        })
        router.push(`/hg_games/contests?user_id=${user_id}&token=${tkn}&game_id=${game_id}`)

    }, [router.isReady])

    return (
        <div></div>
    )
}

export default mega