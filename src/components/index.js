import {initialCards, createCard, deleteCard, likeCard} from "./cards.js";
import {closePopup, openPopup, overlayClose, crossButtonClose} from "./modal";

const cards = document.querySelector('.places__list');

// Отображаем карточки
initialCards.forEach(item => {
    const card = createCard(item, deleteCard, likeCard, popupCard);
    cards.append(card);
});

// Закрытие попапа
document.addEventListener('click', crossButtonClose);
document.addEventListener('click', overlayClose);

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
    addFirstChild(cards, createCard(card, deleteCard, likeCard, popupCard));
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
const popupCardImage = document.querySelector('.popup__image');
const popupCardCaption = document.querySelector('.popup__caption');
const popupCardWindow = document.querySelector('.popup_type_image');

function popupCard(event) {
    const target = event.target;

    fillCardImagePopup(target);
    openPopup(popupCardWindow);
}

function fillCardImagePopup(target) {
    popupCardImage['src'] = target['src'];
    popupCardImage['alt'] = target['alt'];
    popupCardCaption.textContent = target.closest('.card').querySelector('.card__title').textContent;
}