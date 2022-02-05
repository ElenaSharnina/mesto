import { Popup } from '../components/Popup.js';

export class PopupWithImage extends Popup {
	constructor(popupSelector) {
		super(popupSelector);
	}
	open(image, name) {
		super.open();
		this._popup.querySelector('.modal-card__image') = image;
		this._popup.querySelector('.modal-card__label') = name;
	}
}