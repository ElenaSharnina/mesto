export class Popup {
  constructor(popupSelector) {
    this._popupSelector = document.querySelector(popupSelector);
  }

  open() {
    this._popup.classList.add('modal_active');
    document.body.classList.add('page-js');
    popup.addEventListener('click', this._closeModalByOverlay);
    this._document.addEventListener('keydown', this._closeModalByESC);
  }

  close() {
    this._popup.classList.remove('modal_active');
    document.body.classList.remove('page-js');
    document.removeEventListener('keydown', this._closeModalByESC);
    this._popup.removeEventListener('click', this._closeModalByOverlay);
  }

  _closeModalByESC(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }
  _closeModalByOverlay(evt) {
    if (evt.target === evt.currentTarget) {
      this.close();
    }
  }
  setEventListeners() {
    this._popup.querySelector('.modal__close-icon').addEventListener('click', () => {
      this.close();
    })
  }
}