import { avatarInput } from "../utils/constants";

export class UserInfo {
  constructor(userNameSelector, userInfoSelector, userAvatarSelector) {  // в брифе селекторы!
    this._userName = document.querySelector(userNameSelector);
    this._userInfo = document.querySelector(userInfoSelector);
    this._userAvatar = document.querySelector(userAvatarSelector);
  }

  getUserInfo() {
    const userValues = {
      userName: this._userName.textContent,
      userInfo: this._userInfo.textContent
    }
    return userValues;
  }

  setUserInfo(data) {
    this._userName.textContent = data.name;
    this._userInfo.textContent = data.about;
    this._userAvatar.src = data.avatar;
    this._id = data._id;
  }

  //setUserPhoto(avatar) {
  // this._userAvatar.src = avatar;
  //}
  getId() {
    return this._id;
  }

}