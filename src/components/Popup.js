export class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }

  open() { //открытие модального окна
    this._popup.classList.add('modal_active');
    document.body.classList.add('page-js');
    this._popup.addEventListener('click', this._closeModalByOverlay);
    document.addEventListener('keydown', this._closeModalByESC);
  }

  close() { //закрытие модального окна
    this._popup.classList.remove('modal_active');
    document.body.classList.remove('page-js');
    document.removeEventListener('keydown', this._closeModalByESC);
    this._popup.removeEventListener('click', this._closeModalByOverlay);
  }

  _closeModalByESC(evt) { // закрытие по ESC
    if (evt.key === 'Escape') {
      this.close();
    }
  }
  _closeModalByOverlay(evt) { // закрытие по клику по оверлею
    if (evt.target === evt.currentTarget) {
      this.close();
    }
  }
  setEventListeners() {
    const modalCloseBtn = this._popup.querySelector('.modal__close-icon');
    modalCloseBtn.addEventListener('click', () => {
      this.close();
    })
  }
}