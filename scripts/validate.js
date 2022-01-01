//объект селекторов и классов
const validationList = {
  formSelector: '.modal__form',
  inputSelector: '.modal__field',
  submitButtonSelector: '.modal__button',
  inactiveButtonClass: 'modal__button_disabled',
  inputErrorClass: 'modal__field_type_error',
  errorClass: 'modal__error_visible'
};

//функция, которая показывает элемент ошибки ввода

const showInputError = (formElement, inputElement, errorMessage) => {

  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(validationList.inputErrorClass);
  errorElement.classList.add(validationList.errorClass);
  errorElement.textContent = errorMessage;
};

//функция, которая скрывает элемент ошибки ввода

const hideInputError = (formElement, inputElement) => {

  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(validationList.inputErrorClass);
  errorElement.classList.remove(validationList.errorClass);
  errorElement.textContent = '';

};

//проверяем валидность полей
const hasInvalidInput = (inputList) => {

  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })

};

const checkInputValidity = (formElement, inputElement) => {

  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }

};



//функция стилизации кнопки

const toggleButtonState = (inputList, buttonElement) => {

  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(validationList.inactiveButtonClass);
    buttonElement.setAttribute('disabled', true); //делаем кнопку неактивной
  } else {
    buttonElement.classList.remove(validationList.inactiveButtonClass);
    buttonElement.removeAttribute('disabled');
  }

};

//добавляем слушателя всем элементам

const setEventListeners = (formElement) => {

  const inputList = Array.from(document.querySelectorAll(validationList.inputSelector));
  const buttonElement = formElement.querySelector(validationList.submitButtonSelector);
  //вызываем функцию стилизации кнопки
  toggleButtonState(inputList, buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

//добавляем обработчиков события всем формам 

const enableValidation = () => {

  const formList = Array.from(document.querySelectorAll(validationList.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });

    setEventListeners(formElement);
  });
};

//вызываем функцию валидации всех форм
enableValidation(validationList);