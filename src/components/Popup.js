export class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._closeBtn = this._popup.querySelector('.modal__close-icon');
  }

  open() { //открытие модального окна
    this._popup.classList.add('modal_active');
    document.body.classList.add('page-js');

    this.setEventListeners();
  }

  close() { //закрытие модального окна
    this._popup.classList.remove('modal_active');
    document.body.classList.remove('page-js');

    this.removeEventListener();
  }

  _closeModalByESC = (evt) => { // закрытие по ESC
    if (evt.key === 'Escape') {
      this.close();
    }
  }
  _closeModalByOverlay = (evt) => { // закрытие по клику по оверлею
    if (evt.target.classList.contains('modal')) {
      this.close();
    }
  }
  _closeModalByIcon = () => {
    this.close();
  }
  setEventListeners() {
    this._closeBtn.addEventListener('click', this._closeModalByIcon);
    document.addEventListener('click', this._closeModalByOverlay);
    document.addEventListener('keydown', this._closeModalByESC);
  }
  removeEventListener() {
    document.removeEventListener('keydown', this._closeModalByESC);
    this._closeBtn.removeEventListener('click', this._closeModalByIcon);
    document.removeEventListener('click', this._closeModalByOverlay);
  }
}