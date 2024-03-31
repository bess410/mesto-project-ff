import {initialCards, createCard, deleteCard, likeCard} from "./cards.js";
import {closePopup, openPopup, fillCardImagePopup} from "./modal";

const cards = document.querySelector('.places__list');

// Отображаем карточки
initialCards.forEach(item => {
    const card = createCard(item, deleteCard, likeCard);
    cards.append(card);
});

// Закрытие попапа при клике на оверлее
document.addEventListener('click', evt => {
    const target = evt.target;
    if (target.classList.contains('popup__close')) {
        closePopup(target.closest('.popup'));
    }
});

// Редактирование профиля
const formEditProfile = document.forms['edit-profile'];
const inputProfileName = formEditProfile.elements['name'];
const inputProfileDescription = formEditProfile.elements['description'];
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const buttonEditProfile = document.querySelector('.profile__edit-button');
const popupEditProfile = document.querySelector('.popup_type_edit');

buttonEditProfile.addEventListener('click', () => {
    fillEditProfilePopup();
    openPopup(popupEditProfile);
});

formEditProfile.addEventListener('submit', submitEditProfile);

function fillEditProfilePopup() {
    inputProfileName.value = profileTitle.textContent;
    inputProfileDescription.value = profileDescription.textContent;
}

function submitEditProfile(evt) {
    evt.preventDefault();

    profileTitle.textContent = inputProfileName.value;
    profileDescription.textContent = inputProfileDescription.value;
    closePopup(formEditProfile.closest('.popup'));
}

// Добавление новой карточки
const formAddNewCard = document.forms['new-place'];
const inputNewCardName = formAddNewCard.elements['place-name'];
const inputNewCardUrl = formAddNewCard.elements['link'];
const buttonAddNewCard = document.querySelector('.profile__add-button');
const popupAddNewCard = document.querySelector('.popup_type_new-card');
const popupCard = document.querySelector('.popup_type_image');

buttonAddNewCard.addEventListener('click', () => {
    openPopup(popupAddNewCard);
});

formAddNewCard.addEventListener('submit', submitAddNewCard);

function submitAddNewCard(evt) {
    evt.preventDefault();

    const card = {
        name: inputNewCardName.value,
        link: inputNewCardUrl.value
    }
    addFirstChild(cards, createCard(card, deleteCard, likeCard));
    formAddNewCard.reset();
    closePopup(formAddNewCard.closest('.popup'));
}

function addFirstChild(parent, newElement) {
    const firstChild = parent.firstChild;
    if (firstChild) {
        parent.insertBefore(newElement, firstChild);
    } else {
        parent.append(newElement);
    }
}

//Отображение полноэкранной картинки
document.addEventListener('click', evt => {
    const target = evt.target;

    if (target.classList.contains('card__image')) {
        fillCardImagePopup(target);
        openPopup(popupCard);
    }
    if (target.classList.contains('popup_is-opened')) {
        closePopup(target);
    }
});