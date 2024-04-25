const baseUrl = 'https://nomoreparties.co/v1/wff-cohort-12';
const headers = {
    authorization: '276ad100-5acb-4462-bd4c-2c97ced4dc2a',
    'Content-Type': 'application/json'
};

const apiMethod = (apiRequest) => {
    return fetch(`${baseUrl}/${apiRequest.url}`, {
        method: `${apiRequest.method}`,
        headers: headers,
        body: JSON.stringify(apiRequest.body)
    })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(res.status);
        });
}

const getInitialCards = () => apiMethod({url: 'cards', method: 'GET'});
const getUserProfile = () => apiMethod({url: 'users/me', method: 'GET'});
const updateProfile = (name, description) =>
    apiMethod({url: 'users/me', method: 'PATCH', body: {name: name, about: description}});
const updateAvatar = (avatar) =>
    apiMethod({url: 'users/me/avatar', method: 'PATCH', body: {avatar: avatar}});
const uploadCard = (card) =>
    apiMethod({url: 'cards', method: 'POST', body: card});
const deleteLike = (id) => apiMethod({url: `cards/likes/${id}`, method: 'DELETE'});
const addLike = (id) => apiMethod({url: `cards/likes/${id}`, method: 'PUT'});
const deleteCard = (id) => apiMethod({url: `cards/${id}`, method: 'DELETE'});

export {apiMethod, getInitialCards, getUserProfile, updateProfile, updateAvatar, uploadCard, deleteLike, addLike, deleteCard}