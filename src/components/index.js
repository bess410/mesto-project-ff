import {createCard, deleteCard, likeCard} from "./card.js";
import {closePopup, openPopup, overlayClose, crossButtonClose} from "./modal";
import {clearValidation, enableValidation} from "./validation";
import validationConfig from "./config/validationConfig";
import {apiMethod} from "./api";

enableValidation(validationConfig);

// Загружаем данные с сервера
Promise.all([
    apiMethod({
        method: 'GET',
        url: 'users/me',
        renderFunction: renderProfile
    }),
    apiMethod({
        method: 'GET',
        url: 'cards',
        renderFunction: renderCards
    })
])
    .catch(error => console.log(error))

// Отображаем карточки
const cards = document.querySelector('.places__list');

function renderCards(res) {
    res.forEach(card => {
        cards.prepend(createCard(card, profileInfo.dataset.userId, deleteCard, likeCard, popupCard));
    });
}

// Закрытие попапа
document.addEventListener('click', crossButtonClose);
document.addEventListener('click', overlayClose);

// Редактирование профиля
const formEditProfile = document.forms['edit-profile'];
const inputProfileName = formEditProfile.elements['name'];
const inputProfileDescription = formEditProfile.elements['description'];
const profileInfo = document.querySelector('.profile__info');
const profileTitle = profileInfo.querySelector('.profile__title');
const profileDescription = profileInfo.querySelector('.profile__description');
const buttonEditProfile = document.querySelector('.profile__edit-button');
const popupEditProfile = document.querySelector('.popup_type_edit');

buttonEditProfile.addEventListener('click', () => {
    fillEditProfilePopup();
    openPopup(popupEditProfile);
    clearValidation(formEditProfile, validationConfig);
});

formEditProfile.addEventListener('submit', submitEditProfile);

function fillEditProfilePopup() {
    inputProfileName.value = profileTitle.textContent;
    inputProfileDescription.value = profileDescription.textContent;
}

function submitEditProfile(evt) {
    evt.preventDefault();

    apiMethod({
        url: 'users/me',
        method: 'PATCH',
        body: {
            name: inputProfileName.value,
            about: inputProfileDescription.value
        },
        renderFunction: renderProfile
    });
    closePopup(formEditProfile.closest('.popup'));
}

// Добавление новой карточки
const formAddNewCard = document.forms['new-place'];
const inputNewCardName = formAddNewCard.elements['place-name'];
const inputNewCardUrl = formAddNewCard.elements['link'];
const buttonAddNewCard = document.querySelector('.profile__add-button');
const popupAddNewCard = document.querySelector('.popup_type_new-card');

buttonAddNewCard.addEventListener('click', () => {
    formAddNewCard.reset();
    clearValidation(formAddNewCard, validationConfig);
    openPopup(popupAddNewCard);
});

formAddNewCard.addEventListener('submit', submitAddNewCard);

function submitAddNewCard(evt) {
    evt.preventDefault();

    const card = {
        name: inputNewCardName.value,
        link: inputNewCardUrl.value
    }
    apiMethod({
        url: 'cards',
        method: 'POST',
        body: card,
        renderFunction: (res) => {
            cards.append(createCard(res, profileInfo.dataset.userId, deleteCard, likeCard, popupCard));
        }
    });

    closePopup(formAddNewCard.closest('.popup'));
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

//Получение данных о пользователе
const profileImage = document.querySelector('.profile__image');

function renderProfile(res) {
    profileInfo.dataset.userId = res._id;
    profileTitle.textContent = res.name;
    profileDescription.textContent = res.about.replace(/[^а-яА-ЯёЁa-zA-Z \-]+/g, '');
    profileImage.style.backgroundImage = `url(${res.avatar})`;
}
