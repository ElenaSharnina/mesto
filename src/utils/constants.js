export const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];
export const objConfig = {
    formSelector: '.modal__form',
    inputSelector: '.modal__field',
    submitButtonSelector: '.modal__button',
    inactiveButtonClass: 'modal__button_disabled',
    inputErrorClass: 'modal__field_type_error',
    errorClass: 'modal__error_visible'
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