import {deleteLike, addLike, apiDeleteCard} from "./api";

const cardTemplate = document.querySelector('#card-template').content;

function createCard(card, ownerId, deleteFunction, likeFunction, popupFunction) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    cardElement.querySelector('.card__title').textContent = card.name;
    const cardId = card._id;

    const img = cardElement.querySelector('.card__image');
    img.src = card.link;
    img.alt = card.name;
    img.addEventListener('click', () => popupFunction(card));

    const likeButton = cardElement.querySelector('.card__like-button');
    likeButton.addEventListener('click', (event) => likeFunction(event, cardId));
    const likesCounter = cardElement.querySelector('.card__like-counter');
    likesCounter.textContent = card.likes.length === 0 ? '' : card.likes.length;
    if (card.likes.some(like => like._id === ownerId)) {
        likeButton.classList.add('card__like-button_is-active');
    }

    const buttonDelete = cardElement.querySelector('.card__delete-button');
    if (card.owner._id !== ownerId) {
        buttonDelete.remove();
    } else {
        buttonDelete.addEventListener('click', () => deleteFunction(cardElement, cardId));
    }

    return cardElement;
}

const deleteCard = (cardElement, cardId) => {
    return apiDeleteCard(cardId)
        .then(() => {
            cardElement.remove();
        })
        .catch(error => console.log(error));
}

const likeCard = (event, cardId) => {
    const likeButton = event.target;
    const card = likeButton.closest('.card');
    const likes = card.querySelector('.card__like-counter');

    if (likeButton.classList.contains('card__like-button_is-active')) {
        deleteLike(cardId)
            .then(data => {
                likeButton.classList.toggle('card__like-button_is-active');
                likes.textContent = data.likes.length === 0 ? '' : data.likes.length;
            })
            .catch(error => console.log(error));
    } else {
        addLike(cardId)
            .then(data => {
                likeButton.classList.toggle('card__like-button_is-active');
                likes.textContent = data.likes.length === 0 ? '' : data.likes.length;
            })
            .catch(error => console.log(error));
    }
}

export {createCard, deleteCard, likeCard};