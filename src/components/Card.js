
export class Card {
  constructor(item, selector, handleCardClick, myId, handleCardDelete, like, dislike) {
    this._item = item;
    this._name = item.name;
    this._link = item.link;
    this._likes = item.likes;
    this._id = item._id;
    this._selector = selector;
    this._openModalCard = handleCardClick;
    this._myId = myId;
    this._ownerId = item.owner._id;
    this._like = like;
    this._dislike = dislike;
    this._handleCardDelete = handleCardDelete;

  }

  _getTemplate() {              //возвращаем разметку
    const cardElement = document
      .querySelector(this._selector)
      .content
      .querySelector('.element')
      .cloneNode(true);

    return cardElement;
  }

  getId() {
    return this._id;
  }

  createCard() {             //добавляем в разметку название и картинку
    this._element = this._getTemplate();

    if (this._ownerId != this._myId) {
      this._element.querySelector('.element__delete').remove();
    }

    this._element.querySelector('.element__image').src = this._link;
    this._element.querySelector('.element__image').alt = this._name;
    this._element.querySelector('.element__name').textContent = this._name;

    this._setEventListeners();
    this.countLikes(this._item);
    this._checkLikes();

    return this._element;
  }

  likeElement() {            //like карточки
    this._element.querySelector('.element__like').classList.add('element__like_active');
  }
  dislikeElement() {
    this._element.querySelector('.element__like').classList.remove('element__like_active');
  }

  deleteElement = () => {        //удаление карточки
    this._element.remove();
    this._element = null;
  }

  _checkLikes() {
    this._likes.forEach(like => {
      if (like._id === this._myId) {
        this._element.querySelector('.element__like').classList.add('element__like_active');
      }
    });
  }
  countLikes(data) {
    this._element.querySelector('.element__count').textContent = data.likes.length;
  }

  _setEventListeners() { //добавляем слушатели на лайк и удаление карточки

    this._element.querySelector('.element__image').addEventListener('click', () => { // слушатель на открытие карточки в модальном окне
      this._openModalCard(this._name, this._link)
    });


    if (this._ownerId === this._myId) {
      this._element.querySelector('.element__delete').addEventListener('click', () => {
        this._handleCardDelete();
      });
    }
    this._element.querySelector('.element__like').addEventListener('click', () => {
      if (this._element.querySelector('.element__like').classList.contains('element__like_active')) {
        this.dislikeElement();
        this._dislike();
      } else {
        this.likeElement();
        this._like();
      }
    });
  };


}