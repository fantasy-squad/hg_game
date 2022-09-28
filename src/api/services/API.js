const Repository = require("../api");
const CustomToast = require("../../helpers/toast");
import Joi from "joi";
import { readAtom, writeAtom } from "jotai-nexus";
import apiAtom from "../../jotai/apiAtom";
import { io } from 'socket.io-client'
import env from '../../configs/api'
const api = new Repository();
// const toast = new CustomToast();
import toast from 'react-hot-toast'


const { auth, product } = {
	auth: "auth",
	product: "product",
};

export default {
	joinContest: ({ body, params }, cb, token) => {
		const schema = Joi.object({
			contest_id: Joi.number().required(),
		}).validate(body);

		if (schema.error) {
			return toast.error(schema.error.message);
		}

		api
			.post("html_game/join", body, params, token)
			.then((d) => {
				if (d.status) {
					toast.success(d.message);
					return cb(d);
				} else {

					return toast.error(d.message);
				}
			})
			.catch((err) => console.log(err));
	},

	joinMega: ({ body, params }, cb, token) => {
		const schema = Joi.object({
			contest_id: Joi.number().required(),
		}).validate(body);

		if (schema.error) {
			return toast.error(schema.error.message);
		}

		api
			.post("html_game/join-mega", body, params, token)
			.then((d) => {
				if (d.status) {
					toast.success(d.message);
					return cb(d);
				} else {

					return toast.error(d.message);
				}
			})
			.catch((err) => console.log(err));
	},



	findMyGroup: ({ body, params }, cb, token, err = () => { }) => {
		const schema = Joi.object({
			contest_id: Joi.number().required(),
		}).validate(body);

		if (schema.error) {
			return toast.error(schema.error.message);
		}

		api
			.post("html_game/group", body, params, token)
			.then((d) => {
				if (d.status) {
					writeAtom(apiAtom.myGroup, d.data)
					return cb(d.data);
				} else {
					console.log("error message")
					toast.error(d.message);
					return err();
				}
			})
			.catch((err) => err(err));
	},

	getScore: ({ body, params }, cb, token, err = () => { }) => {
		const schema = Joi.object({
			contest_id: Joi.number().required(),
			user_id: Joi.string().required(),
			group_id: Joi.string().required(),
		}).validate(body);

		if (schema.error) {
			return toast.error(schema.error.message);
		}

		api
			.post("html_game/result", body, params, token)
			.then((d) => {
				if (d.status) {
					writeAtom(apiAtom.myScore, d.data)
					return cb(d.data);
				} else {
					console.log("error message")
					toast.error(d.message);
					return err();
				}
			})
			.catch((err) => err(err));
	},

	getMegaScore: ({ body, params }, cb, token, err = () => { }) => {
		const schema = Joi.object({
			contest_id: Joi.number().required(),
			user_id: Joi.string().required(),
			group_id: Joi.string().required(),
		}).validate(body);

		if (schema.error) {
			return toast.error(schema.error.message);
		}

		api
			.post("html_game/mega-result", body, params, token)
			.then((d) => {
				if (d.status) {
					writeAtom(apiAtom.myScore, d.data)
					return cb(d.data);
				} else {
					console.log("error message")
					toast.error(d.message);
					return err();
				}
			})
			.catch((err) => err(err));
	},


	contestList: ({ params }, cb, token) => {
		;
		writeAtom(apiAtom.contestList, []);
		api
			.get("html_game/contests", params, token)
			.then((d) => {
				console.log("🚀 ~ file: API.js ~ line 51 ~ .then ~ d", d)

				if (d.status) {
					writeAtom(apiAtom.contestList, d?.data);
					return cb(d);
				} else {
					return toast.error(d?.message)
				}
			})
			.catch((err) => console.log(err));
	},
	myHistory: ({ params }, cb, token) => {
		;
		writeAtom(apiAtom.historyList, []);
		// writeAtom(apiAtom.contestList, []);
		api
			.get("html_game/history", params, token)
			.then((d) => {
				console.log("🚀 ~ file: API.js ~ line 51 ~ .then ~ d", d)

				if (d.status) {
					writeAtom(apiAtom.historyList, d?.data);
					return cb(d);
				} else {
					return toast.error(d?.message)
				}
			})
			.catch((err) => console.log(err));
	},

	gameDetail: ({ params, id }, cb, token) => {

		api
			.get(`html_game/game-detail/${id}`, params, token)
			.then((d) => {
				console.log("🚀 ~ file: API.js ~ line 51 ~ .then ~ d", d)

				if (d.status) {
					writeAtom(apiAtom.gameDetail, d?.data);
					return cb(d);
				} else {
					// return toast.error(d?.message)
				}
			})
			.catch((err) => console.log(err));
	},


	contestDetail: ({ params, id }, cb, token) => {

		api
			.get(`html_game/contest-detail/${id}`, params, token)
			.then((d) => {


				if (d.status) {
					writeAtom(apiAtom.contestDetail, d?.data);
					return cb(d);
				} else {
					// return toast.error(d?.message)
				}
			})
			.catch((err) => console.log(err));
	},

	megaLeaderboard: ({ params }, cb, token) => {
		api
			.get(`html_game/mega-leaderboard`, params, token)
			.then((d) => {
				if (d.status) {
					writeAtom(apiAtom.megaLeaderboard, d?.data);
					return cb(d);
				} else {
					// return toast.error(d?.message)
				}
			})
			.catch((err) => console.log(err));
	},
	megaLeaderboardRanks: ({ params }, cb, token) => {
		let list = readAtom(apiAtom.megaLeaderboardRanks)
		let opt = readAtom(apiAtom.megaLeaderboardOpt)

		if (list?.length == opt.total_count && opt.page > 0) return;



		api
			.get(`html_game/mega-leaderboard-ranks`, params, token)
			.then((d) => {
				if (d.status) {

					writeAtom(apiAtom.megaLeaderboardRanks, [...list, ...d?.data]);

					writeAtom(apiAtom.megaLeaderboardOpt, {
						...opt,
						page: d.meta.current_page,
						total_pages: d.meta.total_pages,
						total_count: d.meta.total_count
					})


					return cb(d);
				} else {
					// return toast.error(d?.message)
				}
			})
			.catch((err) => console.log(err));
	},

	me: ({ params }, cb, token) => {

		api
			.get(`auth/me`, params, token)
			.then((d) => {
				console.log("🚀 ~ file: API.js ~ line 51 ~ .then ~ d", d)

				if (d.status) {
					writeAtom(apiAtom.user, d?.data);
					return cb(d);
				} else {
					// return toast.error(d?.message)
				}
			})
			.catch((err) => console.log(err));
	},

	Socket: (cb) => {

		let socket = readAtom(apiAtom.socket)




		if (!socket) {

			socket = io(env.socket_url)
			// socket = io(api.socket_url, { transports: ["websocket", "polling"], })

		}




		socket.on("error", (err) => {
			console.log(err)
		});

		writeAtom(apiAtom.socket, socket)



		return cb(socket)

	}



};


/*
contest:
auto_create_on_full: null
bonus: "3.00"
commission: "5.00"
created_at: "2022-08-30 15:25:42"
duration: 2
entry_fee: 11
group_teams: 2
hg_category_id: "1"
hg_game_id: 4
id: 457
invite_code: "MqFGYBEk"
is_confirmed: null
max_team: null
new_prize_breakup: null
payment_data: null
prize: 20
prize_breakup: null
starting_at: "2022-08-30 15:33:49"
status: "COMPLETED"
total_teams: 0
type: "PAID"
updated_at: "2022-08-30 15:35:51"
winner_percentage: null
[[Prototype]]: Object
group:
id: "466"
[[Prototype]]: Object
leaderboard: Array(2)
0:
hg_contest_id: 457
hg_game_id: 4
hg_group_id: "466"
id: 1092
prize: "20.00"
rank: 1
score: "540.00"
status: "COMPLETED"
user: {id: '8a88bce9-9b40-410c-a22d-0d0cb7df170b', name: 'Arshad Ansari', username: 'arsd4244', email: 'arsdansari291@gmail.com', photo: 'https://fs-new-bucket.s3.amazonaws.com/16505324385…1bf-4ed7-8023-1b3b8dd8fc5f7026940880262583142.jpg'}
user_id: "8a88bce9-9b40-410c-a22d-0d0cb7df170b"
[[Prototype]]: Object
1: {id: 1093, hg_game_id: 4, rank: 2, score: '0.00', user_id: '1b51e638-4670-4ac5-ba16-a64577ebeb57', …}
length: 2
[[Prototype]]: Array(0)
oponents: Array(1)
0: {id: 1092, hg_game_id: 4, rank: 1, score: '540.00', user_id: '8a88bce9-9b40-410c-a22d-0d0cb7df170b', …}
length: 1
[[Prototype]]: Array(0)
user:
hg_contest_id: 457
hg_game_id: 4
hg_group_id: "466"
id: 1092
prize: "20.00"
rank: 1
score: "540.00"
status: "COMPLETED"
user: {id: '8a88bce9-9b40-410c-a22d-0d0cb7df170b', name: 'Arshad Ansari', username: 'arsd4244', email: 'arsdansari291@gmail.com', photo: 'https://fs-new-bucket.s3.amazonaws.com/16505324385…1bf-4ed7-8023-1b3b8dd8fc5f7026940880262583142.jpg'}
user_id: "8a88bce9-9b40-410c-a22d-0d0cb7df170b"

*/