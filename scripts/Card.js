
export class Card {
  constructor(item, selector) {
    this._name = item.name;
    this._link = item.link;
    this._selector = selector;
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

  _likeActive() {            //like карточки
    const likeBtn = this._element.querySelector('.element__like');
    likeBtn.classList.toggle('element__like_active');
  }

  _deleteElement() {        //удаление карточки
    this._element.remove();
  }

  _openModalCard() {    //открытие карточки в модальном окне
    const modalCard = document.querySelector('.modal-card');
    const modalImage = document.querySelector('.modal-card__image');
    const modalLabel = document.querySelector('.modal-card__label');
    modalImage.src = this._link;
    modalImage.alt = this._name;
    modalLabel.textContent = this._name;
    modalCard.classList.add('modal_active');
  }

  _setEventListeners() { //добавляем слушатели на лайк и удаление карточки
    this._element.querySelector('.element__like').addEventListener('click', () => {
      this._likeActive()
    });

    this._element.querySelector('.element__delete').addEventListener('click', () => {
      this._deleteElement()
    });

    this._element.querySelector('.element__image').addEventListener('click', () => {
      this._openModalCard()
    });
  }
}