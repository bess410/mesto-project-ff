import {createCard, deleteCard, likeCard} from "./card.js";
import {closePopup, openPopup, overlayClose, crossButtonClose} from "./modal";
import {clearValidation, enableValidation} from "./validation";
import validationConfig from "./config/validationConfig";
import {apiMethod} from "./api";

enableValidation(validationConfig);
// Закрытие попапа
document.addEventListener('click', crossButtonClose);
document.addEventListener('click', overlayClose);

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
    const button = evt.target.querySelector('.popup__button');
    button.textContent = 'Сохранение...';
    apiMethod({
        url: 'users/me',
        method: 'PATCH',
        body: {
            name: inputProfileName.value,
            about: inputProfileDescription.value
        },
        renderFunction: renderProfile
    })
        .finally(() => {
            closePopup(formEditProfile.closest('.popup'));
            button.textContent = 'Сохранить';
        });
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
    const button = evt.target.querySelector('.popup__button');
    button.textContent = 'Сохранение...';
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
    })
        .finally(() => {
            closePopup(formAddNewCard.closest('.popup'));
            button.textContent = 'Сохранить';
        });
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
const popupUpdateAvatar = document.querySelector('.popup_type_update_avatar');
const formUpdateAvatar = document.forms['update-avatar'];
const inputUpdateAvatar =formUpdateAvatar.elements['link'];

profileImage.addEventListener('click', () => {
    profileImage.classList.add('clicked');
    fillUpdateAvatarPopup();
    openPopup(popupUpdateAvatar);
    clearValidation(formUpdateAvatar, validationConfig);
});

profileImage.addEventListener('mouseout', () => profileImage.classList.remove('clicked'));

function fillUpdateAvatarPopup() {
    inputUpdateAvatar.value = profileImage.style.backgroundImage.slice(5, -2);
}

formUpdateAvatar.addEventListener('submit', submitUpdateAvatar);

function submitUpdateAvatar(evt) {
    evt.preventDefault();
    const button = evt.target.querySelector('.popup__button');
    button.textContent = 'Сохранение...';
    apiMethod({
        url: 'users/me/avatar',
        method: 'PATCH',
        body: {
            avatar: inputUpdateAvatar.value
        },
        renderFunction: renderProfile
    })
        .finally(() => {
            closePopup(inputUpdateAvatar.closest('.popup'));
            button.textContent = 'Сохранить';
        });
}

function renderProfile(res) {
    profileInfo.dataset.userId = res._id;
    profileTitle.textContent = res.name;
    profileDescription.textContent = res.about.replace(/[^а-яА-ЯёЁa-zA-Z \-]+/g, '');
    profileImage.style.backgroundImage = `url(${res.avatar})`;
}
