import {
    initialCards,
    objConfig,
    buttonEdit,
    nameInput,
    jobInput,
    username,
    userjob,
    addButton,
    picName,
    picLink,
    btnSubmitAddCard
} from '../utils/constants.js';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';
//import './index.css';

// включаем валидацию каждой форме

const profileFormValidation = new FormValidator(objConfig, '.modal__form_place_regform');
const addImageFormValidation = new FormValidator(objConfig, '.modal__form_place_modalpic');

addImageFormValidation.enableValidation();
profileFormValidation.enableValidation();

// вставляем карточки из массива в разметку

const cardList = new Section({
    items: initialCards,
    renderer: (cardItem) => {
        const card = new Card(cardItem, '#element', openModalCard);
        const cardElement = card.createCard();
        cardList.addItem(cardElement);
    }
}, '.elements'

);
cardList.renderItems();

function submitFormNewCard() {

    const picElement = {
        name: picName.value,
        link: picLink.value
    }
    const card = new Card(picElement, '#element', openModalCard);
    cardList.addItem(card.createCard());
    btnSubmitAddCard.setAttribute('disabled', true); // кнопка неактивна при открытии и пустых полях
    btnSubmitAddCard.classList.add('modal__button_disabled');
}

function openPopupAddPhoto() {
    const popupAddPhoto = new PopupWithForm('.modalpic', submitFormNewCard);
    popupAddPhoto.open();
}


function openModalCard(name, link) {    //открытие карточки в модальном окне
    const popupWithImage = new PopupWithImage('.modal-card');
    this.src = link;
    this.textContent = name;
    popupWithImage.setEventListeners();
    popupWithImage.open(name, link);
}

//функция открытия модального окна редактирования профиля

function openPopupEditProfile() {
    const popupEditProfile = new PopupWithForm('.modal-edit', submitProfileForm);
    popupEditProfile.open();
    const inputValues = new UserInfo({
        userName: username,
        userInfo: userjob
    });
    nameInput.value = inputValues.getUserInfo().userName;
    jobInput.value = inputValues.getUserInfo().userInfo;
}

function submitProfileForm() {

    const userInfo = new UserInfo({
        userName: username,
        userInfo: userjob
    })
    userInfo.setUserInfo();
}



buttonEdit.addEventListener('click', () => openPopupEditProfile());

addButton.addEventListener('click', () => openPopupAddPhoto());
