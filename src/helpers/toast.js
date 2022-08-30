import toast from "react-hot-toast"



class CustomToast {
    constructor(id, options = {}) {
        this.toast = toast;
        this.toast_id = "mytoastId"

        if (id) {
            this.toast_id = id

        }

    }

    loading(msg) {
        return this.toast.loading(msg ?? "Loading...", { id: this.toast_id })
    }

    success(msg) {
        return this.toast.success(msg ?? "", { id: this.toast_id })
    }

    error(msg) {
        return this.toast.error(msg ?? "", { id: this.toast_id })
    }
















}

module.exports = CustomToast;