import {createCard, likeCard} from "./card.js";
import {closePopup, openPopup, overlayClose} from "./modal";
import {clearValidation, enableValidation} from "./validation";
import validationConfig from "./config/validationConfig";
import {uploadCard, getInitialCards, getUserProfile, updateProfile, updateAvatar, deleteCard} from "./api";

enableValidation(validationConfig);
// Закрытие попапа
const crossButtons = document.querySelectorAll('.popup__close');
crossButtons.forEach(button => button.addEventListener('click',
    (evt) => closePopup(evt.target.closest('.popup'))));

const popups = document.querySelectorAll('.popup');
popups.forEach(popup => popup.addEventListener('click',
    (evt) => overlayClose(evt)));

//Изменение аватара
const profileImage = document.querySelector('.profile__image');
const popupUpdateAvatar = document.querySelector('.popup_type_update_avatar');
const formUpdateAvatar = document.forms['update-avatar'];
const inputUpdateAvatar = formUpdateAvatar.elements['link'];

profileImage.addEventListener('click', () => {
    profileImage.classList.add('clicked');
    inputUpdateAvatar.value = '';
    openPopup(popupUpdateAvatar);
    clearValidation(formUpdateAvatar, validationConfig);
});

profileImage.addEventListener('mouseout', () => profileImage.classList.remove('clicked'));

formUpdateAvatar.addEventListener('submit', (evt) => submitUpdateAvatar(evt, inputUpdateAvatar.value));

function submitUpdateAvatar(evt, avatar) {
    evt.preventDefault();
    evt.submitter.textContent = 'Сохранение...';
    updateAvatar(avatar)
        .then((data) => {
            profileImage.style.backgroundImage = `url(${data.avatar})`;
            closePopup(popupUpdateAvatar);
        })
        .catch(error => console.log(error))
        .finally(() => {
            evt.submitter.textContent = 'Сохранить';
        });
}

//Редактирование профиля
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

function fillEditProfilePopup() {
    inputProfileName.value = profileTitle.textContent;
    inputProfileDescription.value = profileDescription.textContent;
}

formEditProfile.addEventListener('submit', (evt) => submitEditProfile(evt, inputProfileName.value, inputProfileDescription.value));

function submitEditProfile(evt, name, description) {
    evt.preventDefault();
    evt.submitter.textContent = 'Сохранение...';
    updateProfile(name, description)
        .then((data) => {
            renderProfile(data);
            closePopup(popupEditProfile);
        })
        .catch(error => console.log(error))
        .finally(() => {
            evt.submitter.textContent = 'Сохранить';
        });
}

function renderProfile(res) {
    profileTitle.textContent = res.name;
    profileDescription.textContent = res.about.replace(/[^а-яА-ЯёЁa-zA-Z \-]+/g, '');
    profileImage.style.backgroundImage = `url(${res.avatar})`;
}

// Отображаем карточки
const cards = document.querySelector('.places__list');

function renderCards(res, ownerId) {
    res.forEach(card => {
        cards.append(createCard(card, ownerId, likeCard, popupCard, confirmDeletion));
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

formAddNewCard.addEventListener('submit', (event) => submitAddNewCard(event));

function submitAddNewCard(evt) {
    evt.preventDefault();
    evt.submitter.textContent = 'Сохранение...';
    const card = {
        name: inputNewCardName.value,
        link: inputNewCardUrl.value
    }
    uploadCard(card)
        .then(data => {
            cards.prepend(createCard(data, data.owner._id, likeCard, popupCard, confirmDeletion));
            closePopup(popupAddNewCard);
        })
        .catch(error => console.log(error))
        .finally(() => {
            evt.submitter.textContent = 'Создать';
        });
}

//Отображение полноэкранной картинки
const popupCardImage = document.querySelector('.popup__image');
const popupCardCaption = document.querySelector('.popup__caption');
const popupCardWindow = document.querySelector('.popup_type_image');

function popupCard(card) {
    fillCardImagePopup(card);
    openPopup(popupCardWindow);
}

function fillCardImagePopup(card) {
    popupCardImage.src = card.link;
    popupCardImage.alt = card.name;
    popupCardCaption.textContent = card.name;
}

//Удаление карточки
const confirmCardDeletionPopup = document.querySelector('.popup_type_confirm_card_deletion');
const button = confirmCardDeletionPopup.querySelector('.popup__button');

let cardIdToDelete = 0;
let cardElementToDelete;

button.addEventListener('click', (event) => {
    event.preventDefault();
    deleteCardListener();
});

function deleteCardListener() {
    deleteCard(cardIdToDelete)
        .then(() => {
            cardElementToDelete.remove();
            closePopup(confirmCardDeletionPopup)
        })
        .catch(error => console.log(error));
}

const confirmDeletion = (cardElement, cardId) => {
    openPopup(confirmCardDeletionPopup);
    cardIdToDelete = cardId;
    cardElementToDelete = cardElement;
}

// Загружаем данные с сервера
Promise.all([getUserProfile(), getInitialCards()])
    .then(data => {
        renderProfile(data[0]);
        renderCards(data[1], data[0]._id);
    })
    .catch(error => console.log(error));