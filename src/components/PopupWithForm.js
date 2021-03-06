import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector('.modal__form');
    this._inputList = this._form.querySelectorAll('.modal__field');
  }

  _getInputValues = () => {
    const valuesObj = {};
    this._inputList.forEach((input) => {
      valuesObj[input.name] = input.value;
    });
    return valuesObj;

  }
  _handleSubmit = () => { // устраняем баг с пустыми сабмитами, удаляя все слушатели на закрытии
    this._handleFormSubmit(this._getInputValues());
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
  }
  alertLoading(isLoading, message) { // уведемление о процессе загрузки
    const submitBtn = this._popup.querySelector('.modal__button_loader');
    if (isLoading) {
      submitBtn.textContent = `Сохранение...`;
    }
    else {
      submitBtn.textContent = message;
    }
  }
}