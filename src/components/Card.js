
export class Card {
  constructor(item, selector, handleCardClick, handleCardDelete) {
    this._name = item.name;
    this._link = item.link;
    this._selector = selector;
    this._openModalCard = handleCardClick;
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

  createCard() {             //добавляем в разметку название и картинку
    this._element = this._getTemplate();
    this._element.querySelector('.element__image').src = this._link;
    this._element.querySelector('.element__image').alt = this._name;
    this._element.querySelector('.element__name').textContent = this._name;

    this._setEventListeners();

    return this._element;
  }

  _likeElement() {            //like карточки
    this._element.querySelector('.element__like').classList.toggle('element__like_active');
  }

  deleteElement = () => {        //удаление карточки
    this._element.remove();
    this._element = null;
  }

  _setEventListeners() { //добавляем слушатели на лайк и удаление карточки
    this._element.querySelector('.element__like').addEventListener('click', () => {
      this._likeElement()
    });

    this._element.querySelector('.element__delete').addEventListener('click', () => {
      this._handleCardDelete()
    });

    this._element.querySelector('.element__image').addEventListener('click', () => { // слушатель на открытие карточки в модальном окне
      this._openModalCard(this._name, this._link)
    });
  }
}