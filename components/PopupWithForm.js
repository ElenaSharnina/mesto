import { Popup } from '../components/Popup.js';

export class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
  }

  _getInputValues() {
    const values = {};
    Array.from(this.form.querySelectorAll('.modal__field')).forEach(input => {
      values[input.name] = input.value
    });
    return values;
  }
  setEventListeners() {
    super.setEventListeners();
    this._popup.querySelector('.modal__form').addEventListener('submit', () => {
      this._handleFormSubmit(this._getInputValues());
      this.close();
    })
  }

  close() {
    super.close();
    this._popup.querySelector('.modal__form').reset();
  }
}