import {
  objConfig,
  buttonEdit,
  nameInput,
  jobInput,
  avatarInput,
  addButton,
  picName,
  picLink,
  btnSubmitAddCard,
  btnSubmitAvatar,
  elementEditAvatar,
  apiConfig
} from '../utils/constants.js';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';
import { PopupDelete } from '../components/PopupDelete.js';
import { Api } from '../components/Api.js'
import './index.css';
let myId;
let cardList;

const popupDeleteCard = new PopupDelete('.modal-delete', '.modal__form_place_delete');
const popupAddPhoto = new PopupWithForm('.modalpic', submitFormNewCard);
const popupWithImage = new PopupWithImage('.modal-card');
const popupEditProfile = new PopupWithForm('.modal-edit', submitProfileForm);
const inputValues = new UserInfo('.profile__name', '.profile__occupation', '.profile__foto');
const popupEditAvatar = new PopupWithForm('.modal-edid-avatar', submitFormAvatar);
const api = new Api(apiConfig);

api.getUserInfoApi() // получение данных о пользователе с сервера
  .then(res => {
    console.log(res);
    myId = res._id;
    inputValues.setUserInfo(res);
  })
  .catch(err => {
    console.log(err);
  });

api.getInitialCards()  //получение карточек с сервера
  .then(res => {
    console.log(res);
    cardList = new Section({
      items: res,
      renderer: cardItem => {
        const cardElement = createCard(cardItem);
        cardList.addItem(cardElement);
      },
    },
      '.elements'
    );
    cardList.renderItems();
  })
  .catch(err => {
    console.log(err);
  });

// функция создания карточки
function createCard(cardItem) {
  const card = new Card(cardItem, '#element', openModalCard, myId, () => {
    popupDeleteCard.open(() =>
      api.deleteCard(card.getId()) //удаление своей карточки
        .then(() => {
          card.deleteElement();
          popupDeleteCard.close();
        })
        .catch((err) => {
          console.log(err);
        }));
  }, () => {
    api.like(card.getId()) //like
      .then((res) => {
        card.likeElement();
        card.countLikes(res);
      })
      .catch((err) => {
        console.log(err);
      })
  }, () => {
    api.dislike(card.getId()) //снятие лайкa
      .then((res) => {
        card.dislikeElement();
        card.countLikes(res);
      })
      .catch((err) => {
        console.log(err);
      })
  })
  const cardElement = card.createCard();
  return cardElement;
};


function submitFormNewCard() { // добавление новой карточки
  const picElement = {
    name: picName.value,
    link: picLink.value
  }
  popupAddPhoto.alertLoading(true);
  api.addNewCard(picElement.name, picElement.link)
    .then(data => {
      cardList.addItem(createCard(data));
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      this.alertLoading(false);
    })
  btnSubmitAddCard.setAttribute('disabled', true); // кнопка неактивна при открытии и пустых полях
  btnSubmitAddCard.classList.add('modal__button_disabled');
}

function openModalCard(name, link) {    //открытие карточки в модальном окне
  this.src = link;
  this.textContent = name;
  popupWithImage.open(name, link);
}

function submitProfileForm() { //редактирование данных профиля
  const info = {
    username: nameInput.value,
    userjob: jobInput.value
  }
  popupEditProfile.alertLoading(true);
  api.setUserInfoApi(info.username, info.userjob)
    .then(data => {
      inputValues.setUserInfo(data);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupEditProfile.alertLoading(false);
    })
}

function submitFormAvatar() { //редактировние аватара
  popupEditAvatar.alertLoading(true);
  api.changeAvatar(avatarInput.value)
    .then(res => {
      inputValues.setUserInfo(res);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupEditAvatar.alertLoading(false);
    })
  btnSubmitAvatar.setAttribute('disabled', true); // кнопка неактивна при открытии и пустых полях
  btnSubmitAvatar.classList.add('modal__button_disabled');
}

//popupDeleteCard.setEventListeners();
//popupWithImage.setEventListeners();

buttonEdit.addEventListener('click', () => { //открытие модального окна редактирования данных профиля
  nameInput.value = inputValues.getUserInfo().userName;
  jobInput.value = inputValues.getUserInfo().userInfo;
  popupEditProfile.open();
});

addButton.addEventListener('click', () => { //открытие модального окна добавления новой карточки
  popupAddPhoto.open();
});

elementEditAvatar.addEventListener('click', () => { //открытие модального окна редактирования аватара
  popupEditAvatar.open();
});

// включаем валидацию каждой форме

const profileFormValidation = new FormValidator(objConfig, '.modal__form_place_regform');
const addImageFormValidation = new FormValidator(objConfig, '.modal__form_place_modalpic');
const editAvatarFornValidation = new FormValidator(objConfig, '.modal__form_place_edit-avatar');

addImageFormValidation.enableValidation();
profileFormValidation.enableValidation();
editAvatarFornValidation.enableValidation();