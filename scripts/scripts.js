let anchor = document.querySelector(".profile__edit-button");
let modal = document.querySelector(".modal");
let closeButton = document.querySelector(".modal__close-icon");
let saveButton = document.querySelector(".modal__button");
function openModal() {
    modal.classList.add("modal_active");
}
anchor.addEventListener("click", openModal);
function closeModal() {
    modal.classList.remove("modal_active");
}
closeButton.addEventListener("click", closeModal);
saveButton.addEventListener("click", closeModal);

let formElement = document.querySelector(".modal__form");
let nameInput = document.querySelector(".modal__name-field");
let jobInput = document.querySelector(".modal__occupation-field");
let username = document.querySelector(".profile__name");
let userjob = document.querySelector(".profile__occupation");


function formSubmitHandler(evt) {
    evt.preventDefault();
    
    username.textContent=nameInput.value;
    userjob.textContent=jobInput.value;

}

formElement.addEventListener('submit', formSubmitHandler);

