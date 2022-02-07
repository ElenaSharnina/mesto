import { Popup } from '../components/Popup.js';

export class PopupWithImage extends Popup {
	constructor(popupSelector) {
		super(popupSelector);
	}
	open(name, link) {
		super.open();
		this._popup.querySelector('.modal-card__image').src = link;
		this._popup.querySelector('.modal-card__label').textContent = name;
	}
}