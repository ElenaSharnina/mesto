import {
  objConfig,
  buttonEdit,
  nameInput,
  jobInput,
  avatarInput,
  username,
  userjob,
  addButton,
  picName,
  picLink,
  btnSubmitAddCard,
  btnSubmitAvatar,
  elementEditAvatar,
  apiConfig
} from '../utils/constants.js';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';
import { PopupDelete } from '../components/PopupDelete.js';
import { Api } from '../components/Api.js'
import './index.css';

// включаем валидацию каждой форме

const profileFormValidation = new FormValidator(objConfig, '.modal__form_place_regform');
const addImageFormValidation = new FormValidator(objConfig, '.modal__form_place_modalpic');
const editAvatarFornValidation = new FormValidator(objConfig, '.modal__form_place_edit-avatar');

addImageFormValidation.enableValidation();
profileFormValidation.enableValidation();
editAvatarFornValidation.enableValidation();


const api = new Api(apiConfig);
let cardList;
api.getInitialCards()  //получение карточек с сервера
  .then(res => {
    console.log(res);
    cardList = new Section({
      items: res,
      renderer: cardItem => {
        const cardElement = createCard(cardItem);
        cardList.addItem(cardElement);
      },
    },
      '.elements'
    );
    cardList.renderItems();

  })
  .catch(err => {
    console.log(err);
  });


// функция создания карточки

function createCard(cardItem) {
  const card = new Card(cardItem, '#element', openModalCard);
  const cardElement = card.createCard();
  return cardElement;
};


//const cardList = new Section({
//  items: initialCards,
//  renderer: (cardItem) => {
//    const cardElement = createCard(cardItem);
//    cardList.addItem(cardElement);
//  }
//}, '.elements'

//);
//cardList.renderItems();
api.getUserInfoApi()
  .then(res => {
    console.log(res);
    inputValues.setUserInfo(res);

  })
  .catch(err => {
    console.log(err);
  });

function submitFormNewCard() {
  const picElement = {
    name: picName.value,
    link: picLink.value
  }
  api.addNewCard(picElement.name, picElement.link)
    .then(data => {
      cardList.addItem(createCard(data));
    })
  //cardList.addItem(createCard(picElement));
  btnSubmitAddCard.setAttribute('disabled', true); // кнопка неактивна при открытии и пустых полях
  btnSubmitAddCard.classList.add('modal__button_disabled');
}



const popupAddPhoto = new PopupWithForm('.modalpic', submitFormNewCard);

function openPopupAddPhoto() {
  popupAddPhoto.open();
}

const popupWithImage = new PopupWithImage('.modal-card');
popupWithImage.setEventListeners();

function openModalCard(name, link) {    //открытие карточки в модальном окне
  this.src = link;
  this.textContent = name;
  popupWithImage.open(name, link);
}

//функция открытия модального окна редактирования профиля
const popupEditProfile = new PopupWithForm('.modal-edit', submitProfileForm);

const inputValues = new UserInfo('.profile__name', '.profile__occupation');

function submitProfileForm() {
  //inputValues.setUserInfo(nameInput, jobInput);
  const info = {
    username: nameInput.value,
    userjob: jobInput.value
  }
  api.setUserInfoApi(info.username, info.userjob)
    .then(data => {
      console.log(data);
      inputValues.setUserInfo(data);
    })
}

function openPopupEditProfile() {

  nameInput.value = inputValues.getUserInfo().userName;
  jobInput.value = inputValues.getUserInfo().userInfo;

  popupEditProfile.open();
}

// редактирование аватара

const popupEditAvatar = new PopupWithForm('.modal-edid-avatar', submitFormAvatar);

function openPopupEditAvatar() {
  popupEditAvatar.open();
}
function submitFormAvatar() {
  document.querySelector('.profile__foto').src = avatarInput.value;
  btnSubmitAvatar.setAttribute('disabled', true); // кнопка неактивна при открытии и пустых полях
  btnSubmitAvatar.classList.add('modal__button_disabled');
}

// удаление карточки через попап
const popupDeleteCard = new PopupDelete('.modal-delete', '.modal__button_place_delete');
function openDeletePopup() {
  popupDeleteCard.open();
}
popupDeleteCard.setEventListeners();

buttonEdit.addEventListener('click', () => openPopupEditProfile());

addButton.addEventListener('click', () => openPopupAddPhoto());

elementEditAvatar.addEventListener('click', () => openPopupEditAvatar());

