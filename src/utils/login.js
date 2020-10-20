

export const logout = () => {
    localStorage.removeItem("@auth_token");
}

export const isLogin = (id) => {

 

    if (localStorage.getItem("@auth_token") && id!==undefined) {
        return true;
    }

    return false;
}

export const isAdminLogin = (adminStatus) => {

    if (localStorage.getItem("@auth_token2") && adminStatus==true) {
        return true;
    }

    return false;
}