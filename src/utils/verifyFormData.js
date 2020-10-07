export const verifyEmail = (email) => {

    const verify = /[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}/.test(email)

    if (verify) {
        return { color: "2px solid #00C6D6", ok: true }

    }
    else {

        return { color: "2px solid red", ok: false }
    }
};

export const verifyPass = (password) => {

    const verify=/^(?=.*[a-zA-Z])(?=.*[0-9])/.test(password)

    if (verify) {
        return { color: "2px solid #00C6D6", ok: true }

    }
    else {

        return { color: "2px solid red", ok: false }
    }

};

export const verifyName = (name) => {

    if (name.length > 3) {
        return { color: "2px solid #00C6D6", ok: true }
    }
    else {

        return { color: "2px solid red", ok: false }
    }
}

export const verifyMatch = (password, match) => {

    if (password === match) {
        return { color: "2px solid #00C6D6", ok: true }

    }
    else {

        return { color: "2px solid red", ok: false }
    }


}

