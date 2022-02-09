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

  setUserInfo(nameInput, jobInput) {
    this._userName.textContent = nameInput.value;
    this._userInfo.textContent = jobInput.value;
  }

}