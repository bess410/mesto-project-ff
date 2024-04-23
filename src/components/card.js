import {apiMethod} from "./api";
import {closePopup, openPopup} from "./modal";

const cardTemplate = document.querySelector('#card-template').content;

function createCard(card, ownerId, deleteFunction, likeFunction, popupFunction) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    cardElement.id = card._id;
    cardElement.querySelector('.card__title').textContent = card.name;

    const img = cardElement.querySelector('.card__image');
    img.src = card.link;
    img.alt = card.name;
    img.addEventListener('click', (event) => popupFunction(event));

    const likeButton = cardElement.querySelector('.card__like-button');
    likeButton.addEventListener('click', (event) => likeFunction(event));
    const likesCounter = cardElement.querySelector('.card__like-counter');
    likesCounter.textContent = card.likes.length === 0 ? '' : card.likes.length;
    if (card.likes.some(like => like._id === ownerId)) {
        likeButton.classList.add('card__like-button_is-active');
    }

    const buttonDelete = cardElement.querySelector('.card__delete-button');
    if (card.owner._id !== ownerId) {
        buttonDelete.remove();
    } else {
        buttonDelete.addEventListener('click', (event) => confirmCardDeletion(event));
    }

    return cardElement;
}

//Открытие окна подтверждения удаления карточки
const confirmCardDeletionPopup = document.querySelector('.popup_type_confirm_card_deletion');

function confirmCardDeletion(event) {
    const card = event.target.closest('.card');
    openPopup(confirmCardDeletionPopup);
    const button = confirmCardDeletionPopup.querySelector('.popup__button');
    button.addEventListener('click', () => deleteCard(card));
}

const deleteCard = function (card) {
    apiMethod({
        method: 'DELETE',
        url: `cards/${card.id}`,
        renderFunction: () => card.remove()
    })
        .finally(() => closePopup(confirmCardDeletionPopup));
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