import {initialCards, createCard, deleteCard} from "./cards.js";
import "./modal.js";

const cards = document.querySelector('.places__list');

initialCards.forEach(item => {
    const card = createCard(item, deleteCard);
    cards.append(card);
});