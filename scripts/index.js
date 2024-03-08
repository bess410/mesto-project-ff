// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const cards = document.querySelector('.places__list');

// @todo: Функция создания карточки
function createCard(card, deleteFunction) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const img = cardElement.querySelector('.card__image');
    img.src = card.link;
    img.alt = card.name;
    cardElement.querySelector('.card__title').textContent = card.name;
    cardElement.querySelector('.card__delete-button').addEventListener('click', (event) => deleteFunction(event));

    return cardElement;
}

// @todo: Функция удаления карточки
const deleteCard = function (event) {
    event.target.closest('.card').remove();
}

// @todo: Вывести карточки на страницу
initialCards.forEach(item => {
    const card = createCard(item, deleteCard);
    cards.append(card);
});
