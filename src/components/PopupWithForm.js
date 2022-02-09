import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector('.modal__form');
    this._inputList = this._form.querySelectorAll('.modal__field');
  }
  _getInputValues() {
    const valuesObj = {};
    this._inputList.forEach((input) => {
      valuesObj.name = input.value
    });
    return valuesObj;

  }
  _handleSubmit = () => { // устраняем баг с пустыми сабмитами, удаляя все слушатели на закрытии
    this._handleFormSubmit(this._getInputValues());
    this.close();
  }
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', this._handleSubmit);
  }
  removeEventListener() {
    super.removeEventListener();
    this._form.removeEventListener('submit', this._handleSubmit);
  }
  close() {
    super.close();
    this._form.reset();
    this.removeEventListener();
  }
}