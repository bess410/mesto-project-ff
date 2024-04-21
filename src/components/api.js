const baseUrl = 'https://nomoreparties.co/v1/wff-cohort-12';
const headers = {
    authorization: '276ad100-5acb-4462-bd4c-2c97ced4dc2a',
    'Content-Type': 'application/json'
};

function apiMethod(apiRequest) {
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
        })
        .then(res => {
                apiRequest.renderFunction(res);
            }
        )
        .catch(err => console.log(`Ошибка: ${err}`));
}

export {apiMethod};