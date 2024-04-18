const cardTemplate = document.querySelector('#card-template').content;

function createCard(card, deleteFunction, likeFunction, popupFunction) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const img = cardElement.querySelector('.card__image');
    img.src = card.link;
    img.alt = card.name;
    cardElement.querySelector('.card__title').textContent = card.name;
    cardElement.querySelector('.card__delete-button').addEventListener('click', (event) => deleteFunction(event));
    cardElement.querySelector('.card__like-button').addEventListener('click', (event) => likeFunction(event));
    img.addEventListener('click', (event) => popupFunction(event));

    return cardElement;
}

const deleteCard = function (event) {
    event.target.closest('.card').remove();
}

const likeCard = function (event) {
    event.target.classList.toggle('card__like-button_is-active');
}

export {createCard, deleteCard, likeCard};