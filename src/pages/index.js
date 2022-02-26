import {
  objConfig,
  buttonEdit,
  nameInput,
  jobInput,
  avatarInput,
  cardnameInput,
  urlInput,
  addButton,
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

const getUserInfoPromise = api.getUserInfoApi();
const getInitialCardsPromise = api.getInitialCards();
getUserInfoPromise.then(res => {
  myId = res._id;
  inputValues.setUserInfo(res);
})
  .catch(err => {
    console.log(err);
  });
getInitialCardsPromise.then(res => {
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
Promise.all([getUserInfoPromise, getInitialCardsPromise])
  .then(res => {
    console.log(res);
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


function submitFormNewCard(data) { // добавление новой карточки
  popupAddPhoto.alertLoading(true, 'Создать');
  api.addNewCard(data.cardname, data.cardlink)
    .then(res => {
      cardList.addItem(createCard(res));
      popupAddPhoto.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {

      this.alertLoading(false, 'Создать');
    })
}

function openModalCard(name, link) {    //открытие карточки в модальном окне
  this.src = link;
  this.textContent = name;
  popupWithImage.open(name, link);
}

function submitProfileForm(data) { //редактирование данных профиля
  popupEditProfile.alertLoading(true, 'Сохранить');
  api.setUserInfoApi(data.username, data.userjob)
    .then(res => {
      inputValues.setUserInfo(res);
      popupEditProfile.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {

      popupEditProfile.alertLoading(false, 'Сохранить');
    })
}

function submitFormAvatar(data) { //редактировние аватара
  popupEditAvatar.alertLoading(true, 'Сохранить');
  api.changeAvatar(data.avatar)
    .then(res => {
      inputValues.setUserInfo(res);
      popupEditAvatar.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupEditAvatar.alertLoading(false, 'Сохранить');
    })
}

buttonEdit.addEventListener('click', () => { //открытие модального окна редактирования данных профиля
  nameInput.value = inputValues.getUserInfo().userName;
  jobInput.value = inputValues.getUserInfo().userInfo;
  popupEditProfile.open();
  profileFormValidation.resetValidation();
});

addButton.addEventListener('click', () => { //открытие модального окна добавления новой карточки
  popupAddPhoto.open();
  addImageFormValidation.resetValidation();
});

elementEditAvatar.addEventListener('click', () => { //открытие модального окна редактирования аватара
  popupEditAvatar.open();
  editAvatarFornValidation.resetValidation();
});

// включаем валидацию каждой форме

const profileFormValidation = new FormValidator(objConfig, '.modal__form_place_regform');
const addImageFormValidation = new FormValidator(objConfig, '.modal__form_place_modalpic');
const editAvatarFornValidation = new FormValidator(objConfig, '.modal__form_place_edit-avatar');

addImageFormValidation.enableValidation();
profileFormValidation.enableValidation();
editAvatarFornValidation.enableValidation();