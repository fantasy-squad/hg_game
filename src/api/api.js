const axios = require("axios");
const api = require("../configs/api")


class Repository {
    constructor(options = {}) {
        this.BaseURL = api.base_url || "http://localhost:4000/";
        this.headers = options.headers || {};
        this.headers["Content-Type"] = "application/json"

        this.params = {};
        this.ignorePaths = [
            "auth/login",
            "auth/register",
            "auth/google-login",
            "auth/send-mobile-otp",
            "auth/get-otp",
            "auth/verify-mobile-otp",
            "auth/register",
            "auth/forgot-password",
            "public",
            "send-test-notification",
            "auth/change-password",
            "auth/verify-otp",
            "auth/send-otp",
            "list-banners", "reviews", "tutorials", "tutorial-1", "tutorial-2", "todays-gainers", "todays-depositers", "new-users"
        ]

    }



    setHeader(key, value) {
        this.headers[key] = value;
        return this;
    }

    static name(params) {
        this.headers = {}
        this.headers["Content-Type"] = "application/json"
        // console.log(this.headers)
    }

    async get(url, params, token) {
        try {
            this.headers = {}
            this.headers["Content-Type"] = "application/json"
            // let user = localStorage.getItem("user")
            // if (user != null && !this.ignorePaths.includes(url)) {
            //     user = JSON.parse(user)
            //     this.headers["Authorization"] = 'Bearer ' + user.token
            // }

            if (token) {
                this.headers["Authorization"] = 'Bearer ' + token;
            }

            url = api.base_url + url;
            params = { ...params } || {};

            const response = await axios.get(url, { params: params, headers: this.headers });
            const status = response.status == 200;
            if (status) {
                console.log(response.data)
                return response.data;
            }
        } catch (e) {
            return e;
        }
    }

    async post(url, body, params, token) {
        try {
            this.headers = {}
            this.headers["Content-Type"] = "application/json"
            // let user = localStorage.getItem("user")
            // if (user && !this.ignorePaths.includes(url)) {
            //     user = JSON.parse(user)
            //     this.headers["Authorization"] = 'Bearer ' + user.token
            // }

            if (token) {
                this.headers["Authorization"] = 'Bearer ' + token;
            }

            url = api.base_url + url;
            params = { ...params } || {};
            body = body || {};
            const response = await axios.post(url, body, { params: params, headers: this.headers });
            const status = response.status == 200;
            // console.log('response', response)
            if (status) {
                console.log(response.data)
                return response.data;
            }
        } catch (e) {
            return e;
        }
    }

    async uploadFile(url, body, params) {
        try {
            this.headers = {}
            this.headers["Content-Type"] = "multipart/form-data"

            let user = localStorage.getItem("user")
            if (user && !this.ignorePaths.includes(url)) {
                user = JSON.parse(user)
                this.headers["Authorization"] = 'Bearer ' + user.token
            }

            url = api.base_url + url;

            body = body || {};
            params = { ...params } || {};
            const response = await axios.post(url, body, { params: params, headers: this.headers });
            const status = response.status == 200;
            // console.log('response', response)
            if (status) {
                return response.data;
            }
        } catch (e) {
            return e;
        }

    }




}

module.exports = Repository;