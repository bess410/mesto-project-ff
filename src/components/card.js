import {apiMethod} from "./api";

const cardTemplate = document.querySelector('#card-template').content;

function createCard(card, ownerId, deleteFunction, likeFunction, popupFunction) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    cardElement.id = card._id;
    cardElement.querySelector('.card__title').textContent = card.name;
    cardElement.querySelector('.card__like-button').addEventListener('click', (event) => likeFunction(event));

    const img = cardElement.querySelector('.card__image');
    img.src = card.link;
    img.alt = card.name;
    img.addEventListener('click', (event) => popupFunction(event));

    const likes = cardElement.querySelector('.card__like-counter');
    likes.textContent = card.likes.length === 0 ? '' : card.likes.length;

    const buttonDelete = cardElement.querySelector('.card__delete-button');
    if (card.owner._id !== ownerId) {
        buttonDelete.remove();
    } else {
        buttonDelete.addEventListener('click', (event) => deleteFunction(event));
    }

    return cardElement;
}

const deleteCard = function (event) {
    const card = event.target.closest('.card');
    apiMethod({
        method: 'DELETE',
        url: `cards/${card.id}`,
        renderFunction: () => card.remove()
    });
}

const likeCard = function (event) {
    const likeButton = event.target;
    const card = likeButton.closest('.card');
    const likes = card.querySelector('.card__like-counter');

    if(likeButton.classList.contains('card__like-button_is-active')) {
        apiMethod({
            method: 'DELETE',
            url: `cards/likes/${card.id}`,
            renderFunction: (res) => {
                likeButton.classList.toggle('card__like-button_is-active');
                likes.textContent = res.likes.length === 0 ? '' : res.likes.length;
            }
        });
    } else {
        apiMethod({
            method: 'PUT',
            url: `cards/likes/${card.id}`,
            renderFunction: (res) => {
                likeButton.classList.toggle('card__like-button_is-active');
                likes.textContent = res.likes.length === 0 ? '' : res.likes.length;
            }
        });
    }
}

export {createCard, deleteCard, likeCard};