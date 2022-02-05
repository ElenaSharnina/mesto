import { initialCards } from '../utils/constants.js';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { Popup } from '../components/Popup.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
const buttonEdit = document.querySelector('.profile__edit-button');
const modalEdit = document.querySelector('.modal-edit');
const closeButtonReg = document.querySelector('.modal__close-icon_place_regform');
const closeButtonPic = document.querySelector('.modal__close-icon_place_modalpic');
const formElem = document.querySelector('.modal__form_place_regform');
const formElementPic = document.querySelector('.modal__form_place_modalpic');
const nameInput = document.querySelector('.modal__field_type_name');
const jobInput = document.querySelector('.modal__field_type_occupation');
const username = document.querySelector('.profile__name');
const userjob = document.querySelector('.profile__occupation');
const modalpic = document.querySelector('.modalpic');
const addButton = document.querySelector('.profile__add-button');
const modalCard = document.querySelector('.modal-card');
const modalCardCloseBtn = document.querySelector('.modal__close-icon_place_modal-card');
const picName = document.querySelector('.modal__field_type_card-name');
const picLink = document.querySelector('.modal__field_type_card-link');
const btnSubmitProfile = document.querySelector('.modal__button_place_profile');
const btnSubmitAddCard = document.querySelector('.modal__button_type_create');
const picContainer = document.querySelector('.elements');



const objConfig = {
  formSelector: '.modal__form',
  inputSelector: '.modal__field',
  submitButtonSelector: '.modal__button',
  inactiveButtonClass: 'modal__button_disabled',
  inputErrorClass: 'modal__field_type_error',
  errorClass: 'modal__error_visible'
}

const profileFormValidation = new FormValidator(objConfig, '.modal__form_place_regform');
const addImageFormValidation = new FormValidator(objConfig, '.modal__form_place_modalpic');

// включаем валидацию каждой форме
addImageFormValidation.enableValidation();
profileFormValidation.enableValidation();

const cardList = new Section({
  items: initialCards,
  renderer: (cardItem) => {
    const card = new Card(cardItem, '#element');
    const cardElement = card.createCard();
    cardList.addItem(cardElement);
  }
}, '.elements'

);
cardList.renderItems();

//функция открытия модального окна редактирования профиля

function openPopupEditProfile() {
  nameInput.value = username.textContent;
  jobInput.value = userjob.textContent;
  openModal(modalEdit);
}


//функция закрытия модального окна

function closeModal(popup) {
  popup.classList.remove('modal_active');
  document.body.classList.remove('page-js');
  document.removeEventListener('keydown', closeModalByESC); // убрала слушатели при закрытии окна
  popup.removeEventListener('click', closeModalByOverlay);
}


//функция отправки формы профиля

function submitFormHandler(evt) {
  evt.preventDefault();
  username.textContent = nameInput.value;
  userjob.textContent = jobInput.value;
  closeModal(modalEdit);
}

// добавление карточки из формы

function submitFormNewCard(evt) {
  evt.preventDefault();
  const picElement = {
    name: picName.value,
    link: picLink.value
  }
  const card = new Card(picElement, '#element');
  cardList.addItem(card.createCard());
  closeModal(modalpic);
  formElementPic.reset();
  btnSubmitAddCard.setAttribute('disabled', true); // кнопка неактивна при открытии и пустых полях
  btnSubmitAddCard.classList.add('modal__button_disabled');
}

export function openModalCard(name, link) {    //открытие карточки в модальном окне
  const modalCard = document.querySelector('.modal-card');
  const modalImage = document.querySelector('.modal-card__image');
  const modalLabel = document.querySelector('.modal-card__label');
  modalLabel.textContent = name;
  modalImage.src = link;
  modalImage.alt = name;
  openModal(modalCard);
}


formElementPic.addEventListener('submit', submitFormNewCard);
buttonEdit.addEventListener('click', () => openPopupEditProfile());
formElem.addEventListener('submit', submitFormHandler);
closeButtonReg.addEventListener('click', () => closeModal(modalEdit));
closeButtonPic.addEventListener('click', () => closeModal(modalpic));
addButton.addEventListener('click', () => openModal(modalpic));
modalCardCloseBtn.addEventListener('click', () => closeModal(modalCard));
