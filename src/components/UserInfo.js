export class UserInfo {
  constructor({ userName, userInfo }) {
    this._userName = userName;
    this._userInfo = userInfo;
  }

  getUserInfo() {
    const userValues = {
      userName: this._userName.textContent,
      userInfo: this._userInfo.textContent
    }
    return userValues;
  }

  setUserInfo() {
    this._userName.textContent = document.querySelector('.modal__field_type_name').value;
    this._userInfo.textContent = document.querySelector('.modal__field_type_occupation').value;
  }

}