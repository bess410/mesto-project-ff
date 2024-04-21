const cardTemplate = document.querySelector('#card-template').content;

function createCard(card, ownerId, deleteFunction, likeFunction, popupFunction) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
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
    event.target.closest('.card').remove();
}

const likeCard = function (event) {
    event.target.classList.toggle('card__like-button_is-active');
}

export {createCard, deleteCard, likeCard};