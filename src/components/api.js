function getUserInfo() {
    return fetch('https://nomoreparties.co/v1/wff-cohort-12/users/me', {
        headers: {
            authorization: '276ad100-5acb-4462-bd4c-2c97ced4dc2a'
        }
    });
}

export {getUserInfo};