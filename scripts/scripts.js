let anchor = document.querySelector('.profile__edit-button');
let modal = document.querySelector('.modal');
let closeButton = document.querySelector('.modal__close-icon');
let formElement = document.querySelector('.modal__form');
let nameInput = document.querySelector('.modal__field_name');
let jobInput = document.querySelector('.modal__field_occupation');
let username = document.querySelector('.profile__name');
let userjob = document.querySelector('.profile__occupation');

function openModal() {

    modal.classList.add('modal_active');
    nameInput.value = username.textContent;
    jobInput.value = userjob.textContent;

}

function closeModal() {

    modal.classList.remove('modal_active');

}

function formSubmitHandler(evt) {

    evt.preventDefault();

    username.textContent = nameInput.value;
    userjob.textContent = jobInput.value;
    modal.classList.remove('modal_active');

}
anchor.addEventListener('click', openModal);
formElement.addEventListener('submit', formSubmitHandler, closeModal);
closeButton.addEventListener('click', closeModal);