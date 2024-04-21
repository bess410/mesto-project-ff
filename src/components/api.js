const baseUrl = 'https://nomoreparties.co/v1';
const cohort = 'wff-cohort-12';
const token = '276ad100-5acb-4462-bd4c-2c97ced4dc2a';

function getMethod(apiRequest) {
    return fetch(`${baseUrl}/${cohort}/${apiRequest.url}`, {
        method: `${apiRequest.method}`,
        headers: {
            authorization: token
        }
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

function postMethod(apiRequest) {
    return fetch(`${baseUrl}/${cohort}/${apiRequest.url}`, {
        method: `${apiRequest.method}`,
        headers: {
            authorization: token,
            'Content-Type': 'application/json'
        },
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

export {getMethod, postMethod};