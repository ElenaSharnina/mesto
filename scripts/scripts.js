const buttonEdit = document.querySelector('.profile__edit-button');
const modalEdit = document.querySelector('.modal-edit');
const closeButtonReg = document.querySelector('.modal__close-icon_place_regform');
const closeButtonPic = document.querySelector('.modal__close-icon_place_modalpic');
const formElement = document.querySelector('.modal__form_place_regform');
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
const picContainer = document.querySelector('.elements');
const picTemplate = document.querySelector('#element').content;


nameInput.value = username.textContent;
jobInput.value = userjob.textContent;

//функция открытия модального окна

function openModal (popup) {
  popup.classList.add('modal_active');    
}

//value для того чтобы без обновления страницы выходила пустая форма

function openAddModal () {
  openModal(modalpic);
  picName.value = '';
  picLink.value = '';
}

//функция закрытия модального окна

function closeModal(popup) {
  popup.classList.remove('modal_active');
}

//функция отправки формы профиля

function formSubmitHandler(evt) {
  evt.preventDefault();
  username.textContent = nameInput.value;
  userjob.textContent = jobInput.value;
  closeModal(modalEdit);
}

//выводим карточки на страницу из массива

function addCards (item) {
  picContainer.append(item);
}

function createCard (item) {
  const picElement = picTemplate.querySelector('.element').cloneNode(true);
  picElement.querySelector('.element__name').textContent = item.name;
  picElement.querySelector('.element__image').src = item.link;
  picElement.querySelector('.element__image').alt = item.name;
  picContainer.addEventListener('click', deleteElement); //удаляем картинку
  picContainer.addEventListener('click', modalImageOpen); //открытие модального окна у картинки
  picContainer.addEventListener('click', likeActive); //лайк карточки
  return picElement;
}

function selectionCard (array) { //отбираем элементы из массива
  array.forEach((item) => 
  addCards (createCard (item)));
}
selectionCard(initialCards);
   
// добавление карточки из формы

function formSubmitNewCard(evt) {
  evt.preventDefault();
  const picElement = {
    name: picName.value,
    link: picLink.value
  }
  addCards(createCard(picElement));
  picContainer.addEventListener('click', deleteElement);
  picContainer.addEventListener('click', likeActive);
  picContainer.addEventListener('click', modalImageOpen);
  closeModal(modalpic);
}

//like карточки

function likeActive (evt) {
  const evtLike = evt.target;
  if (evt.target.classList.contains('element__like')) {
  evtLike.classList.toggle('element__like_active');
  }
}

// открытие модального окна для карточки

function modalImageOpen (evt) {
  const evtImage = evt.target;
  if (evtImage.classList.contains('element__image')) {
    modalLabel.textContent = evtImage.alt;
    modalImage.src = evtImage.src;
    modalImage.alt = evtImage.alt;
    openModal(modalCard);
  }
}
  

// удаление Элемента

function deleteElement (evt) {
  const evtDelete = evt.target;
  if (evtDelete.classList.contains('element__delete')) {
    evt.target.closest('.element').remove();
  }
}


formElementPic.addEventListener('submit', formSubmitNewCard);
buttonEdit.addEventListener('click', () => openModal(modalEdit));
formElement.addEventListener('submit', formSubmitHandler);
closeButtonReg.addEventListener('click', () => closeModal(modalEdit));
closeButtonPic.addEventListener('click', () => closeModal(modalpic));
addButton.addEventListener('click', () => openAddModal());
modalCardCloseBtn.addEventListener('click', () => closeModal(modalCard));
