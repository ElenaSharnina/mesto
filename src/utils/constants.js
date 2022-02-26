
export const objConfig = {
  formSelector: '.modal__form',
  inputSelector: '.modal__field',
  submitButtonSelector: '.modal__button',
  inactiveButtonClass: 'modal__button_disabled',
  inputErrorClass: 'modal__field_type_error',
  errorClass: 'modal__error_visible'
}
export const apiConfig = {
  url: 'https://mesto.nomoreparties.co/v1/cohort36',
  headers: {
    authorization: 'aae70420-34f5-44cc-8cb0-a49b7f2f456b',
    'Content-Type': 'application/json'
  }
}
export const buttonEdit = document.querySelector('.profile__edit-button');

export const nameInput = document.querySelector('.modal__field_type_name');
export const jobInput = document.querySelector('.modal__field_type_occupation');
export const username = document.querySelector('.profile__name');
export const userjob = document.querySelector('.profile__occupation');
export const userAvarat = document.querySelector('.profile__foto');
export const addButton = document.querySelector('.profile__add-button');

export const picName = document.querySelector('.modal__field_type_card-name');
export const picLink = document.querySelector('.modal__field_type_card-link');
export const btnSubmitProfile = document.querySelector('.modal__button_place_profile');
export const btnSubmitAddCard = document.querySelector('.modal__button_type_create');
export const btnSubmitAvatar = document.querySelector('.modal__button_place_edit-avatar');
export const elementEditAvatar = document.querySelector('.profile__avatar');
export const avatarInput = document.querySelector('.modal__field_type_url-avatar');
export const cardnameInput = document.querySelector('.modal__field_type_card-name');
export const urlInput = document.querySelector('.modal__field_type_card-link');