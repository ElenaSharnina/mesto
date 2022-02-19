import { Popup } from "./Popup.js";
export class PopupDelete extends Popup {
    constructor(popupSelector, btnDelSelector, handleDeleteElement) {
        super(popupSelector);
        this._btnDelete = document.querySelector(btnDelSelector);
        this._handleDeleteElement = handleDeleteElement;
    }
    open(deleteElement) {
        super.open();
        this._deleteElement = deleteElement;
    }
    setEventListeners() {
        super.setEventListeners();
        this._btnDelete.addEventListener('click', () => this.handleDeleteElement())
    }

}