const anchor = document.querySelector('.profile__edit-button');
const modal = document.querySelector('.modal');
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

function openModal() {
    modal.classList.add('modal_active');
    nameInput.value = username.textContent;
    jobInput.value = userjob.textContent;
}

function openModalpic() {
    modalpic.classList.add('modal_active');
    //value для того чтобы без обновления страницы выходила пустая форма
    picName.value = '';
    picLink.value = '';
}

function closeModal() {
    modal.classList.remove('modal_active');
}

function closeModalpic() {
    modalpic.classList.remove('modal_active');
    
}

function formSubmitHandler(evt) {
    evt.preventDefault();
    username.textContent = nameInput.value;
    userjob.textContent = jobInput.value;
    closeModal();
}
anchor.addEventListener('click', openModal);
formElement.addEventListener('submit', formSubmitHandler);
closeButtonReg.addEventListener('click', closeModal);
closeButtonPic.addEventListener('click', closeModalpic);
addButton.addEventListener('click', openModalpic);



const initialCards = [
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

//выводим карточки на страницу
const picContainer = document.querySelector('.elements');
const picTemplate = document.querySelector('#element').content;

//цикл для отбора массива  
for (let i = 0; i < initialCards.length; i = i + 1) {
    const picElement = picTemplate.querySelector('.element').cloneNode(true);
    picElement.querySelector('.element__name').textContent = initialCards[i].name;
    picElement.querySelector('.element__image').src = initialCards[i].link;
    //LIKE  карточки
    picElement.querySelector('.element__like').addEventListener('click', function() {
      picElement.querySelector('.element__like').classList.toggle('element__like_active');
    })
    // удаление карточки
    picElement.querySelector('.element__delete').addEventListener('click', function() {
      picElement.classList.add('element_delete');
    })
    //открытие картинки в модальном окне
    
    picElement.querySelector('.element__image').addEventListener('click', function() {
      modalCard.classList.add('modal_active');
      modalLabel.textContent = initialCards[i].name;
      modalImage.src = initialCards[i].link;
    })
    //закрытие картинки в модальном окне
    const modalCardCloseBtn = document.querySelector('.modal__close-icon_place_modal-card');
    
    modalCardCloseBtn.addEventListener('click', function() {
      modalCard.classList.remove('modal_active');
   })
    picContainer.append(picElement);
}

// функция добавления новой фотографии
const picName = document.querySelector('.modal__field_type_card-name');
const picLink = document.querySelector('.modal__field_type_card-link');

function formSubmitNewCard(evt) {
  evt.preventDefault();
  const picElement = picTemplate.querySelector('.element').cloneNode(true);
  picElement.querySelector('.element__name').textContent = picName.value;
  picElement.querySelector('.element__image').src = picLink.value;
  
  picContainer.prepend(picElement);
  //LIKE новой карточки

  picElement.querySelector('.element__like').addEventListener('click', function() {
    picElement.querySelector('.element__like').classList.toggle('element__like_active');
  })
  // удаление новой карточки
  picElement.querySelector('.element__delete').addEventListener('click', function() {
    picElement.classList.add('element_delete');
  })
  // открытие модального окна для новой карточки 
  picElement.querySelector('.element__image').addEventListener('click', function() {
    modalCard.classList.add('modal_active');
    modalLabel.textContent = picName.value;
    modalImage.src = picLink.value;
  })
  closeModalpic();
}

formElementPic.addEventListener('submit',formSubmitNewCard);







