import { Popup } from "./Popup.js";
export class PopupDelete extends Popup {
    constructor(popupSelector, formSelector) {
        super(popupSelector);
        this._form = document.querySelector(formSelector);
    }
    open(deleteElement) {
        super.open();
        this._deleteElement = deleteElement;
    }
    _handleSubmitDelete = (evt) => {
        evt.preventDefault();
        this._deleteElement();
    }
    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', this._handleSubmitDelete);
    }

    removeEventListener() {
        super.removeEventListener();
        this._form.removeEventListener('submit', this._handleSubmitDelete);
    }

}