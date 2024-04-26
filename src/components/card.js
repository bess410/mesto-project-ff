const cardTemplate = document.querySelector('#card-template').content;

function createCard(card, ownerId, cardConfig) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    cardElement.querySelector('.card__title').textContent = card.name;
    const cardId = card._id;

    const img = cardElement.querySelector('.card__image');
    img.src = card.link;
    img.alt = card.name;
    img.addEventListener('click', () => cardConfig.popupCard(card));

    const likeButton = cardElement.querySelector('.card__like-button');
    likeButton.addEventListener('click', (event) => cardConfig.likeCard(event, cardId, cardConfig));
    const likesCounter = cardElement.querySelector('.card__like-counter');
    likesCounter.textContent = card.likes.length === 0 ? '' : card.likes.length;
    if (card.likes.some(like => like._id === ownerId)) {
        likeButton.classList.add('card__like-button_is-active');
    }

    const buttonDelete = cardElement.querySelector('.card__delete-button');
    if (card.owner._id !== ownerId) {
        buttonDelete.remove();
    } else {
        buttonDelete.addEventListener('click', () => cardConfig.confirmDeletion(cardElement, cardId));
    }

    return cardElement;
}

const likeCard = (event, cardId, cardConfig) => {
    const likeButton = event.target;
    const card = likeButton.closest('.card');
    const likes = card.querySelector('.card__like-counter');

    if (likeButton.classList.contains('card__like-button_is-active')) {
        cardConfig.deleteLike(cardId)
            .then(data => {
                likeButton.classList.toggle('card__like-button_is-active');
                likes.textContent = data.likes.length === 0 ? '' : data.likes.length;
            })
            .catch(error => console.log(error));
    } else {
        cardConfig.addLike(cardId)
            .then(data => {
                likeButton.classList.toggle('card__like-button_is-active');
                likes.textContent = data.likes.length === 0 ? '' : data.likes.length;
            })
            .catch(error => console.log(error));
    }
}

export {createCard, likeCard};