import { Popup } from '../components/Popup.js';

export class PopupWithImage extends Popup {
	constructor(popupSelector) {
		super(popupSelector);
		this._popupImage = this._popup.querySelector('.modal-card__image');
		this._popupLabel = this._popup.querySelector('.modal-card__label');
	}
	open(name, link) {
		super.open();
		this._popupImage.src = link;
		this._popupLabel.textContent = name;
		this._popupImage.alt = name;
	}
}