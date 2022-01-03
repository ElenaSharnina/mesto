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

//value для того чтобы без обновления страницы выходила пустая форма

function openAddModal() {
  openModal(modalpic);
  picName.value = '';
  picLink.value = '';
  btnSubmitAddCard.classList.add('modal__button_disabled'); //кнопка при открытии неактивна
}

//функция закрытия модального окна

function closeModal(popup) {
  popup.classList.remove('modal_active');
  body.classList.remove('page-js');
  document.removeEventListener('keydown', closeModalByESC); // убрала слушатели при закрытии окна
  document.removeEventListener('click', closeModalByOverlay);
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

//выводим карточки на страницу из массива

function addCard(item) {
  picContainer.prepend(item);
}

function createCard(item) {
  const picElement = picTemplate.cloneNode(true);
  const image = picElement.querySelector('.element__image');
  picElement.querySelector('.element__name').textContent = item.name;
  image.src = item.link;
  image.alt = item.name;

  picElement.querySelector('.element__delete').addEventListener('click', deleteElement); //удаляем картинку

  image.addEventListener('click', () => { //открытие модального окна у картинки
    modalLabel.textContent = item.name;
    modalImage.src = item.link;
    modalImage.alt = item.name;
    openModal(modalCard);
  })

  picElement.querySelector('.element__like').addEventListener('click', likeActive); //лайк карточки
  return picElement;
}

function renderCards(array) { //отбираем элементы из массива
  array.forEach((item) =>
    addCard(createCard(item)));
}
renderCards(initialCards);

// добавление карточки из формы

function submitFormNewCard(evt) {
  evt.preventDefault();
  const picElement = {
    name: picName.value,
    link: picLink.value
  }
  addCard(createCard(picElement));
  closeModal(modalpic);
}

//like карточки

function likeActive(evt) {
  evt.target.classList.toggle('element__like_active');
}

// удаление Элемента

function deleteElement(evt) {
  evt.target.closest('.element').remove();
}


formElementPic.addEventListener('submit', submitFormNewCard);   //в 1-м ревью 6 проекта показано, как классно писать слушатели
buttonEdit.addEventListener('click', () => openPopupEditProfile());
formElem.addEventListener('submit', submitFormHandler);
closeButtonReg.addEventListener('click', () => closeModal(modalEdit));
closeButtonPic.addEventListener('click', () => closeModal(modalpic));
addButton.addEventListener('click', () => openAddModal());
modalCardCloseBtn.addEventListener('click', () => closeModal(modalCard));
