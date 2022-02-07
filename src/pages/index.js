import { initialCards, objConfig } from '../utils/constants.js';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';

const buttonEdit = document.querySelector('.profile__edit-button');

const formElementPic = document.querySelector('.modal__form_place_modalpic');
const nameInput = document.querySelector('.modal__field_type_name');
const jobInput = document.querySelector('.modal__field_type_occupation');
const username = document.querySelector('.profile__name');
const userjob = document.querySelector('.profile__occupation');
const addButton = document.querySelector('.profile__add-button');

const picName = document.querySelector('.modal__field_type_card-name');
const picLink = document.querySelector('.modal__field_type_card-link');
const btnSubmitProfile = document.querySelector('.modal__button_place_profile');
const btnSubmitAddCard = document.querySelector('.modal__button_type_create');


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
  formElementPic.reset();
  btnSubmitAddCard.setAttribute('disabled', true); // кнопка неактивна при открытии и пустых полях
  btnSubmitAddCard.classList.add('modal__button_disabled');
}

function openPopupAddPhoto() {
  const popupAddPhoto = new PopupWithForm('.modalpic', submitFormNewCard);
  popupAddPhoto.setEventListeners();
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
  const popupEditProfile = new PopupWithForm('.modal-edit', handleFormSubmit);
  popupEditProfile.setEventListeners();
  popupEditProfile.open();
  const inputInfo = new UserInfo({ userName: username, userInfo: userjob });
  nameInput.value = inputInfo.getUserInfo().userName;
  jobInput.value = inputInfo.getUserInfo().userInfo;
}


//функция отправки формы профиля

function handleFormSubmit(data) {
  const userInfo = new UserInfo({
    userName: username,
    userInfo: userjob
  })
  userInfo.setUserInfo(data);
}



buttonEdit.addEventListener('click', () => openPopupEditProfile());

addButton.addEventListener('click', () => openPopupAddPhoto());

