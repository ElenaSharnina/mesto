export class UserInfo {
  constructor(userNameSelector, userInfoSelector) {  // в брифе селекторы!
    this._userName = document.querySelector(userNameSelector);
    this._userInfo = document.querySelector(userInfoSelector);

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

  }

}