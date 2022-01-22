import { initialCards } from './utils/cards.js';
import { Card } from './Card.js';
import { FormValidator } from './FormFalidator.js';
const body = document.querySelector('body');
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
const modalImage = document.querySelector('.modal-card__image');
const modalLabel = document.querySelector('.modal-card__label');
const modalCardCloseBtn = document.querySelector('.modal__close-icon_place_modal-card');
const picName = document.querySelector('.modal__field_type_card-name');
const picLink = document.querySelector('.modal__field_type_card-link');
const btnSubmitProfile = document.querySelector('.modal__button_place_profile');
const btnSubmitAddCard = document.querySelector('.modal__button_type_create');
const picContainer = document.querySelector('.elements');
const picTemplate = document.querySelector('#element').content;

const objConfig = {
  formSelector: '.modal__form',
  inputSelector: '.modal__field',
  submitButtonSelector: '.modal__button',
  inactiveButtonClass: 'modal__button_disabled',
  inputErrorClass: 'modal__field_type_error',
  errorClass: 'modal__error_visible'
}

const profileFormValidation = new FormValidator(objConfig, '.modal__form_place_regform');
profileFormValidation.enableValidation();
const addImageFormValidation = new FormValidator(objConfig, '.modal__form_place_modalpic');
addImageFormValidation.enableValidation();



//функция открытия модального окна редактирования профиля

function openPopupEditProfile() {
  nameInput.value = username.textContent;
  jobInput.value = userjob.textContent;
  openModal(modalEdit);
}

//функция открытия модального окна

function openModal(popup) {
  popup.classList.add('modal_active');
  body.classList.add('page-js');
  popup.addEventListener('click', closeModalByOverlay);
  document.addEventListener('keydown', closeModalByESC);
}


//функция закрытия модального окна

function closeModal(popup) {
  popup.classList.remove('modal_active');
  body.classList.remove('page-js');
  document.removeEventListener('keydown', closeModalByESC); // убрала слушатели при закрытии окна
  popup.removeEventListener('click', closeModalByOverlay);
}

//Функция закрытия модальных окон по ESC

function closeModalByESC(evt) {
  if (evt.key === 'Escape') {
    closeModal(document.querySelector('.modal_active'));
  }
}

//Функция закрытия модальных по клику по оверлею

function closeModalByOverlay(evt) {
  if (evt.target === evt.currentTarget) {
    closeModal(evt.target);
  }
}

//функция отправки формы профиля

function submitFormHandler(evt) {
  evt.preventDefault();
  username.textContent = nameInput.value;
  userjob.textContent = jobInput.value;
  closeModal(modalEdit);
}

// масштабируем карточки из класса Card, проходим по заданному массиву
function createItemCard(item) {
  const card = new Card(item, '#element');
  const cardElement = card.createCard();
  return cardElement;
}

function addCard(cardElement) {
  picContainer.prepend(cardElement);
}

initialCards.forEach((item) => {
  const cardElement = createItemCard(item);
  addCard(cardElement);
});


// добавление карточки из формы

function submitFormNewCard(evt) {
  evt.preventDefault();
  const picElement = {
    name: picName.value,
    link: picLink.value
  }
  addCard(createItemCard(picElement));
  closeModal(modalpic);
  picName.value = ''; // пустая форма при открытии после сабмита
  picLink.value = '';
  btnSubmitAddCard.setAttribute('disabled', true); // кнопка неактивна при открытии и пустых полях
  btnSubmitAddCard.classList.add('modal__button_disabled');
}




formElementPic.addEventListener('submit', submitFormNewCard);   //в 1-м ревью 6 проекта показано, как классно писать слушатели
buttonEdit.addEventListener('click', () => openPopupEditProfile());
formElem.addEventListener('submit', submitFormHandler);
closeButtonReg.addEventListener('click', () => closeModal(modalEdit));
closeButtonPic.addEventListener('click', () => closeModal(modalpic));
addButton.addEventListener('click', () => openModal(modalpic));
modalCardCloseBtn.addEventListener('click', () => closeModal(modalCard));
