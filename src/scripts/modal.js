const buttonEditProfile = document.querySelector('.profile__edit-button');
const popupEditProfile = document.querySelector('.popup_type_edit');
const buttonAddNewCard = document.querySelector('.profile__add-button');
const popupAddNewCard = document.querySelector('.popup_type_new-card');
const popupCard = document.querySelector('.popup_type_image');
const popupCardImage = document.querySelector('.popup__image');
const popupCardCaption = document.querySelector('.popup__caption');

buttonEditProfile.addEventListener('click', () => {
    openPopup(popupEditProfile);
});

buttonAddNewCard.addEventListener('click', () => {
    openPopup(popupAddNewCard);
});

document.addEventListener('click', evt => {
    const target = evt.target;
    if (target.classList.contains('popup__close')) {
        closePopup(target.closest('.popup'));
    }
});

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

function fillCardImagePopup(target) {
    popupCardImage['src'] = target['src'];
    popupCardImage['alt'] = target['alt'];
    popupCardCaption.textContent = target.closest('.card').querySelector('.card__title').textContent;
}

function openPopup(target) {
    target.classList.add('popup_is-opened');
    addEscapeListener();
}

function closePopup(target) {
    target.classList.remove('popup_is-opened');
    removeEscapeListener();
}

function addEscapeListener() {
    document.addEventListener('keydown', escapeListener);
}

function removeEscapeListener() {
    document.removeEventListener('keydown', escapeListener);
}

function escapeListener(evt) {
    if (evt.key === 'Escape') {
        closePopup(document.querySelector('.popup_is-opened'));
    }
}

