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

function overlayClose(evt) {
    const target = evt.target;
    if (target.classList.contains('popup_is-opened')) {
        closePopup(target);
    }
}

export {closePopup, openPopup, overlayClose};
