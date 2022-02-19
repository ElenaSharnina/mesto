import {
  initialCards,
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
  elementEditAvatar
} from '../utils/constants.js';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';
import './index.css';

// включаем валидацию каждой форме

const profileFormValidation = new FormValidator(objConfig, '.modal__form_place_regform');
const addImageFormValidation = new FormValidator(objConfig, '.modal__form_place_modalpic');
const editAvatarFornValidation = new FormValidator(objConfig, '.modal__form_place_edit-avatar');

addImageFormValidation.enableValidation();
profileFormValidation.enableValidation();
editAvatarFornValidation.enableValidation();
// вставляем карточки из массива в разметку

function createCard(cardItem) {
  const card = new Card(cardItem, '#element', openModalCard);
  const cardElement = card.createCard();
  return cardElement;
};


const cardList = new Section({
  items: initialCards,
  renderer: (cardItem) => {
    const cardElement = createCard(cardItem);
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
  cardList.addItem(createCard(picElement));
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
  inputValues.setUserInfo(nameInput, jobInput);
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



buttonEdit.addEventListener('click', () => openPopupEditProfile());

addButton.addEventListener('click', () => openPopupAddPhoto());

elementEditAvatar.addEventListener('click', () => openPopupEditAvatar());