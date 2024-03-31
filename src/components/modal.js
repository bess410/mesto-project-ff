const popupCardImage = document.querySelector('.popup__image');
const popupCardCaption = document.querySelector('.popup__caption');

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

export {closePopup, openPopup, fillCardImagePopup};
